'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.google.serverGroup.details.rollback.controller', [
      require('core/account/account.service.js'),
      require('core/application/modal/platformHealthOverride.directive.js'),
      require('core/task/modal/reason.directive.js'),
      require('core/serverGroup/serverGroup.write.service.js'),
      require('core/task/monitor/taskMonitorService.js'),
      require('../../../common/footer.directive.js'),
    ])
    .controller('gceRollbackServerGroupCtrl', function ($scope, $uibModalInstance, serverGroupWriter,
                                                        taskMonitorService,
                                                        application, serverGroup, disabledServerGroups) {
      $scope.serverGroup = serverGroup;
      $scope.disabledServerGroups = disabledServerGroups.sort((a, b) => b.name.localeCompare(a.name));
      $scope.verification = {};

      $scope.command = {
        rollbackType: 'EXPLICIT',
        rollbackContext: {
          rollbackServerGroupName: serverGroup.name
        },
      };

      if (application && application.attributes) {
        if (application.attributes.platformHealthOnlyShowOverride && application.attributes.platformHealthOnly) {
          $scope.command.interestingHealthProviderNames = ['Google'];
        }

        $scope.command.platformHealthOnlyShowOverride = application.attributes.platformHealthOnlyShowOverride;
      }

      this.isValid = function () {
        var command = $scope.command;
        if (!$scope.verification.verified) {
          return false;
        }

        return command.rollbackContext.restoreServerGroupName !== undefined;
      };

      $scope.taskMonitor = taskMonitorService.buildTaskMonitor({
        modalInstance: $uibModalInstance,
        application: application,
        title: 'Rollback ' + serverGroup.name,
      });

      this.rollback = function () {
        this.submitting = true;
        if (!this.isValid()) {
          return;
        }

        var submitMethod = function () {
          return serverGroupWriter.rollbackServerGroup(serverGroup, application, $scope.command);
        };

        $scope.taskMonitor.submit(submitMethod);
      };

      this.cancel = function () {
        $uibModalInstance.dismiss();
      };
    });
