// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injectable, Injector } from '@angular/core';
import { CoreCourseOptionsHandler, CoreCourseOptionsHandlerData } from '@core/course/providers/options-delegate';
import { CoreCourseProvider } from '@core/course/providers/course';
import { AddonVideoplaytimeCourseComponent } from '../components/course/course';
import { AddonVideoplaytimeProvider } from '../providers/videoplaytime';


/**
 * Course nav handler.
 */
@Injectable()
export class AddonVideoplaytimeCourseOptionHandler implements CoreCourseOptionsHandler {
    name = 'AddonVideoplaytime';
    priority = 400;

    constructor(private videoplaytimeProvider: AddonVideoplaytimeProvider) { }

    /**
     * Whether or not the handler is enabled ona site level.
     * @return {boolean|Promise<boolean>} Whether or not the handler is enabled on a site level.
     */
    isEnabled(): boolean | Promise<boolean> {
        // console.log('test');
       

        return true;
    }

    /**
     * Whether or not the handler is enabled for a certain course.
     *
     * @param {number} courseId The course ID.
     * @param {any} accessData Access type and data. Default, guest, ...
     * @param {any} [navOptions] Course navigation options for current user. See CoreCoursesProvider.getUserNavigationOptions.
     * @param {any} [admOptions] Course admin options for current user. See CoreCoursesProvider.getUserAdministrationOptions.
     * @return {boolean|Promise<boolean>} True or promise resolved with true if enabled.
     */
    isEnabledForCourse(courseId: number, accessData: any, navOptions?: any, admOptions?: any): boolean | Promise<boolean> {
        if (accessData && accessData.type == CoreCourseProvider.ACCESS_GUEST) {
            return false; // Not enabled for guests.
        }

      /*  if (navOptions && typeof navOptions.competencies != 'undefined') {
            return navOptions.competencies;
        }*/

        return this.videoplaytimeProvider.isPluginForCourseEnabled(courseId).then((playtime) => {

            return (playtime == 'true') ? true : false;
        });
    }

    /**
     * Returns the data needed to render the handler.
     *
     * @param {Injector} injector Injector.
     * @param {number} course The course.
     * @return {CoreCourseOptionsHandlerData|Promise<CoreCourseOptionsHandlerData>} Data or promise resolved with the data.
     */
    getDisplayData?(injector: Injector, course: any): CoreCourseOptionsHandlerData | Promise<CoreCourseOptionsHandlerData> {
        return {
            title: 'addon.videoplaytime.block',
            class: 'addon-videoplaytime-course-handler',
            component: AddonVideoplaytimeCourseComponent
        };
    }
}