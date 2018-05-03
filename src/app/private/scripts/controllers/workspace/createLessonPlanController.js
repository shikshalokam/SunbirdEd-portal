'use strict'

angular.module('playerApp')
  .controller('LessonPlanController', ['contentService', '$timeout', '$state', 'config',
    '$rootScope', 'toasterService', 'configService', '$scope', function (contentService, $timeout, $state, config,
      $rootScope, toasterService, configService, $scope) {
      var lessonPlan = this
      lessonPlan.formDropdown = configService.getWorkspaceFormDropdown()
      lessonPlan.boards = lessonPlan.formDropdown.boards
      lessonPlan.mediums = lessonPlan.formDropdown.medium
      lessonPlan.subjects = lessonPlan.formDropdown.subjects
      lessonPlan.grades = lessonPlan.formDropdown.grades
      lessonPlan.showCreateLessonPlanModal = false
      lessonPlan.isLessonPlanCreated = false
      lessonPlan.userId = $rootScope.userId
      lessonPlan.mimeType = 'application/vnd.ekstep.content-collection'
      lessonPlan.defaultName = 'Untitled lesson plan'
      lessonPlan.contentType = 'LessonPlan'
      lessonPlan.resourceType = ['Lesson Plan']

      lessonPlan.hideCreateLessonPlanModal = function () {
        $('#createLessonPlanModal').modal('hide')
        $('#createLessonPlanModal').modal('hide others')
        $('#createLessonPlanModal').modal('hide dimmer')
      }

      lessonPlan.initializeModal = function () {
        lessonPlan.showCreateLessonPlanModal = true
        $timeout(function () {
          $('#boardDropDown').dropdown()
          $('#mediumDropDown').dropdown()
          $('#subjectDropDown').dropdown()
          $('#gradeDropDown').dropdown()
          $('#createLessonPlanModal').modal({
            observeChanges: true,
            onHide: function () {
              lessonPlan.data = {}
              if (!lessonPlan.isLessonPlanCreated) {
                $state.go('WorkSpace.ContentCreation')
              }
            }
          }).modal('show')
        }, 10)
      }

      lessonPlan.createContent = function (requestData) {
        lessonPlan.loader = toasterService.loader('', $rootScope.messages.stmsg.m0050)
        contentService.create(requestData).then(function (res) {
          if (res && res.responseCode === 'OK') {
            lessonPlan.isLessonPlanCreated = true
            lessonPlan.showCreateLessonPlanModal = false
            lessonPlan.loader.showLoader = false
            lessonPlan.hideCreateLessonPlanModal()
            lessonPlan.initEKStepCE(res.result.content_id)
          } else {
            lessonPlan.loader.showLoader = false
            toasterService.error($rootScope.messages.fmsg.m0026)
          }
        }).catch(function () {
          lessonPlan.loader.showLoader = false
          toasterService.error($rootScope.messages.fmsg.m0026)
        })
      }

      lessonPlan.saveMetaData = function (data, framework) {
        lessonPlan.framework = framework
        var requestBody = angular.copy(data)
        requestBody.name = requestBody.name ? requestBody.name : lessonPlan.defaultName
        requestBody.mimeType = lessonPlan.mimeType
        requestBody.createdBy = lessonPlan.userId
        requestBody.contentType = lessonPlan.contentType
        requestBody.resourceType = lessonPlan.resourceType
        requestBody.framework = lessonPlan.framework
        if (requestBody.language) {
          requestBody.language = [requestBody.language]
        }
        var requestData = {
          content: requestBody
        }
        lessonPlan.createContent(requestData)
      }

      lessonPlan.initEKStepCE = function (contentId) {
        var params = { contentId: contentId, type: lessonPlan.contentType, framework: lessonPlan.framework }
        $state.go('CollectionEditor', params)
      }
      var CreateLessonPlanFromDataDrivenForm = $rootScope.$on('CreateLessonPlan',
        function (event, args) {
          lessonPlan.saveMetaData(args.Data, args.framework)
        })

      $scope.$on('$destroy', function () {
        CreateLessonPlanFromDataDrivenForm()
      })
    }
  ])
