/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var TimeComponent = /** @class */ (function () {
    function TimeComponent() {
        this.changed = new EventEmitter();
        this.inited = false;
    }
    /**
     * @return {?}
     */
    TimeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        //console.log('ngOnInit')
        this.hour = this.date.date.getHours();
        this.minute = this.date.date.getMinutes();
        this.date.date.setHours(this.hour, this.minute);
        this.inited = true;
    };
    /**
     * @return {?}
     */
    TimeComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (this.inited) {
            this.date.date.setHours(this.hour, this.minute);
        }
    };
    /**
     * @return {?}
     */
    TimeComponent.prototype.change = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var data = this.date.date;
        data.setHours(this.hour, this.minute);
        this.changed.emit(data);
    };
    /**
     * @return {?}
     */
    TimeComponent.prototype.hourChange = /**
     * @return {?}
     */
    function () {
        this.change();
    };
    /**
     * @return {?}
     */
    TimeComponent.prototype.minuteChange = /**
     * @return {?}
     */
    function () {
        this.change();
    };
    /**
     * @return {?}
     */
    TimeComponent.prototype.getTimeArays = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var arr = { min: [], hour: [] };
        for (var i = 0; i < 60; i++) {
            /** @type {?} */
            var k = i.toString();
            k = (k.length == 1) ? '0' + k : k;
            /** @type {?} */
            var item = { val: i, label: k };
            arr['min'].push(item);
            if (i < 24) {
                arr['hour'].push(item);
            }
        }
        return arr;
    };
    TimeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ns-time',
                    template: "<div style=\"display: flex;flex-direction: row;justify-content: space-between;align-items: center; padding: 4px;color: #6f6f6f;background: linear-gradient(90deg,#fff, #e7f4ff); \">\n  <div >{{date.date.getDate()}}.{{date.date.getMonth()+1}}.{{date.date.getFullYear()}} </div>\n    <div>\n      <select [(ngModel)]=\"hour\"  (change)=\"hourChange()\"  style=\"border: 0; background: transparent; padding: 2px;font-size: 11px; outline: none;\">\n        <option *ngFor=\"let hour of getTimeArays()['hour']\" [ngValue]=\"hour.val\">{{hour.label}}</option>\n      </select>\n      <select [(ngModel)]=\"minute\" (change)=\"minuteChange()\" style=\"border: 0; background: transparent; padding: 2px;font-size: 11px; outline: none;\">\n        <option *ngFor=\"let min of getTimeArays()['min']\" [ngValue]=\"min.val\">{{min.label}}</option>\n      </select>\n    </div>\n\n</div>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    TimeComponent.ctorParameters = function () { return []; };
    TimeComponent.propDecorators = {
        date: [{ type: Input }],
        changed: [{ type: Output }]
    };
    return TimeComponent;
}());
export { TimeComponent };
if (false) {
    /** @type {?} */
    TimeComponent.prototype.date;
    /** @type {?} */
    TimeComponent.prototype.changed;
    /** @type {?} */
    TimeComponent.prototype.hour;
    /** @type {?} */
    TimeComponent.prototype.minute;
    /** @type {?} */
    TimeComponent.prototype.inited;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRlcGlja2VyLW5zLyIsInNvdXJjZXMiOlsibGliL3RpbWUvdGltZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBQyxZQUFZLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFekY7SUFjRTtRQUxVLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSXZDLFdBQU0sR0FBRyxLQUFLLENBQUM7SUFHZixDQUFDOzs7O0lBRUQsZ0NBQVE7OztJQUFSO1FBQ0UseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELG1DQUFXOzs7SUFBWDtRQUNFLElBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7Ozs7SUFFRCw4QkFBTTs7O0lBQU47O1lBQ1EsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxrQ0FBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQzs7OztJQUNELG9DQUFZOzs7SUFBWjtRQUNFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDOzs7O0lBRUQsb0NBQVk7OztJQUFaOztZQUNRLEdBQUcsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQztRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDdkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDcEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDeEIsSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFDO1lBQzNCLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBRyxDQUFDLEdBQUMsRUFBRSxFQUFDO2dCQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEI7U0FDRjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Z0JBekRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsbzNCQUFvQzs7aUJBRXJDOzs7Ozt1QkFJRSxLQUFLOzBCQUNMLE1BQU07O0lBa0RULG9CQUFDO0NBQUEsQUEzREQsSUEyREM7U0F0RFksYUFBYTs7O0lBR3hCLDZCQUFjOztJQUNkLGdDQUF1Qzs7SUFFdkMsNkJBQUs7O0lBQ0wsK0JBQU87O0lBQ1AsK0JBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCxFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy10aW1lJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aW1lLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXG4gIEBJbnB1dCgpIGRhdGU7XG4gIEBPdXRwdXQoKSBjaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGhvdXI7XG4gIG1pbnV0ZTtcbiAgaW5pdGVkID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvL2NvbnNvbGUubG9nKCduZ09uSW5pdCcpXG4gICAgdGhpcy5ob3VyID0gdGhpcy5kYXRlLmRhdGUuZ2V0SG91cnMoKTtcbiAgICB0aGlzLm1pbnV0ZSA9IHRoaXMuZGF0ZS5kYXRlLmdldE1pbnV0ZXMoKTtcbiAgICB0aGlzLmRhdGUuZGF0ZS5zZXRIb3Vycyh0aGlzLmhvdXIsIHRoaXMubWludXRlKTtcbiAgICB0aGlzLmluaXRlZCA9IHRydWU7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpe1xuICAgIGlmKHRoaXMuaW5pdGVkKXtcbiAgICAgIHRoaXMuZGF0ZS5kYXRlLnNldEhvdXJzKHRoaXMuaG91ciwgdGhpcy5taW51dGUpO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZSgpIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5kYXRlLmRhdGU7XG4gICAgZGF0YS5zZXRIb3Vycyh0aGlzLmhvdXIsIHRoaXMubWludXRlKTtcbiAgICB0aGlzLmNoYW5nZWQuZW1pdChkYXRhKTtcbiAgfVxuXG4gIGhvdXJDaGFuZ2UoKXtcbiAgICB0aGlzLmNoYW5nZSgpO1xuICB9XG4gIG1pbnV0ZUNoYW5nZSgpe1xuICAgIHRoaXMuY2hhbmdlKCk7XG4gIH1cblxuICBnZXRUaW1lQXJheXMoKXtcbiAgICBjb25zdCBhcnIgPSB7bWluOltdLGhvdXI6W119O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjA7IGkrKykge1xuICAgICAgbGV0IGsgPSBpLnRvU3RyaW5nKCk7XG4gICAgICBrID0gKGsubGVuZ3RoPT0xKT8gJzAnK2s6IGs7XG4gICAgICBsZXQgaXRlbSA9IHt2YWw6aSwgbGFiZWw6a31cbiAgICAgIGFyclsnbWluJ10ucHVzaChpdGVtKTtcbiAgICAgIGlmKGk8MjQpe1xuICAgICAgICBhcnJbJ2hvdXInXS5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbn1cbiJdfQ==