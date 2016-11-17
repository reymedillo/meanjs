'use strict';

var acl = require('acl');

acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function() {
  acl.allow([
    {
      roles: ['admin'],
      allows: [
        {
          resources: '/api/employees',
          permissions: '*'
        },
        {
          resources: '/api/employees/:employeeId',
          permissions: '*'
        }
      ]
    },
    {
      roles: ['user'],
      allows: [
        {
          resources: '/api/employees',
          permissions: ['get','post']
        },
        {
          resources: '/api/employees/:employeeId',
          permissions: ['get']
        }
      ]
    },
    {
      roles: ['guest'],
      allows: [
        {
          resources: '/api/employees',
          permissions: ['get']
        },
        {
          resources: '/api/employees/:employeeId',
          permissions: ['get']
        }
      ]
    }
  ]);
};

exports.isAllowed = function(req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  if(req.employee && req.user && req.employee.user && req.employee.user.id === req.user.id) {
    return next();
  }

  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function(err, isAllowed) {
    if(err) {
      return res.status(500).send('Unexpected authorization error.');
    } else {
      if(isAllowed) {
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized.'
        });
      }
    }
  });
};