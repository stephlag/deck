/*
 * Copyright 2014 Netflix, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.core.utils.scrollTo', ['spinnaker.core.utils.jQuery'])
  .factory('scrollToService', function($timeout, $) {

    function scrollTo(selector, scrollableContainer, offset = 0, delay = 0) {
      $timeout(function() {
        var elem = $(selector);
        if (elem.length) {
          var content = scrollableContainer ? elem.closest(scrollableContainer) : $('body');
          if (content.length) {
            var top = content.scrollTop() + elem.offset().top - offset;
            content.animate({scrollTop: top + 'px'}, 200);
          }
        }
      }, delay);
    }

    return {
      scrollTo: scrollTo
    };
  });
