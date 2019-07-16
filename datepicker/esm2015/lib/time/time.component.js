/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class TimeComponent {
    constructor() {
        this.changed = new EventEmitter();
        this.inited = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        //console.log('ngOnInit')
        this.hour = this.date.date.getHours();
        this.minute = this.date.date.getMinutes();
        this.date.date.setHours(this.hour, this.minute);
        this.inited = true;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.inited) {
            this.date.date.setHours(this.hour, this.minute);
        }
    }
    /**
     * @return {?}
     */
    change() {
        /** @type {?} */
        const data = this.date.date;
        data.setHours(this.hour, this.minute);
        this.changed.emit(data);
    }
    /**
     * @return {?}
     */
    hourChange() {
        this.change();
    }
    /**
     * @return {?}
     */
    minuteChange() {
        this.change();
    }
    /**
     * @return {?}
     */
    getTimeArays() {
        /** @type {?} */
        const arr = { min: [], hour: [] };
        for (let i = 0; i < 60; i++) {
            /** @type {?} */
            let k = i.toString();
            k = (k.length == 1) ? '0' + k : k;
            /** @type {?} */
            let item = { val: i, label: k };
            arr['min'].push(item);
            if (i < 24) {
                arr['hour'].push(item);
            }
        }
        return arr;
    }
}
TimeComponent.decorators = [
    { type: Component, args: [{
                selector: 'ns-time',
                template: "<div style=\"display: flex;flex-direction: row;justify-content: space-between;align-items: center; padding: 4px;color: #6f6f6f;background: linear-gradient(90deg,#fff, #e7f4ff); \">\n  <div >{{date.date.getDate()}}.{{date.date.getMonth()+1}}.{{date.date.getFullYear()}} </div>\n    <div>\n      <select [(ngModel)]=\"hour\"  (change)=\"hourChange()\"  style=\"border: 0; background: transparent; padding: 2px;font-size: 11px; outline: none;\">\n        <option *ngFor=\"let hour of getTimeArays()['hour']\" [ngValue]=\"hour.val\">{{hour.label}}</option>\n      </select>\n      <select [(ngModel)]=\"minute\" (change)=\"minuteChange()\" style=\"border: 0; background: transparent; padding: 2px;font-size: 11px; outline: none;\">\n        <option *ngFor=\"let min of getTimeArays()['min']\" [ngValue]=\"min.val\">{{min.label}}</option>\n      </select>\n    </div>\n\n</div>",
                styles: [""]
            }] }
];
/** @nocollapse */
TimeComponent.ctorParameters = () => [];
TimeComponent.propDecorators = {
    date: [{ type: Input }],
    changed: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRlcGlja2VyLW5zLyIsInNvdXJjZXMiOlsibGliL3RpbWUvdGltZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBQyxZQUFZLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFPekYsTUFBTSxPQUFPLGFBQWE7SUFTeEI7UUFMVSxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUl2QyxXQUFNLEdBQUcsS0FBSyxDQUFDO0lBR2YsQ0FBQzs7OztJQUVELFFBQVE7UUFDTix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7Ozs7SUFFRCxNQUFNOztjQUNFLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDOzs7O0lBQ0QsWUFBWTtRQUNWLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDOzs7O0lBRUQsWUFBWTs7Y0FDSixHQUFHLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTs7Z0JBQ3ZCLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ3BCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3hCLElBQUksR0FBRyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBQztZQUMzQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUcsQ0FBQyxHQUFDLEVBQUUsRUFBQztnQkFDTixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hCO1NBQ0Y7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7OztZQXpERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLG8zQkFBb0M7O2FBRXJDOzs7OzttQkFJRSxLQUFLO3NCQUNMLE1BQU07Ozs7SUFEUCw2QkFBYzs7SUFDZCxnQ0FBdUM7O0lBRXZDLDZCQUFLOztJQUNMLCtCQUFPOztJQUNQLCtCQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtdGltZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGltZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGltZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblxuICBASW5wdXQoKSBkYXRlO1xuICBAT3V0cHV0KCkgY2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBob3VyO1xuICBtaW51dGU7XG4gIGluaXRlZCA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy9jb25zb2xlLmxvZygnbmdPbkluaXQnKVxuICAgIHRoaXMuaG91ciA9IHRoaXMuZGF0ZS5kYXRlLmdldEhvdXJzKCk7XG4gICAgdGhpcy5taW51dGUgPSB0aGlzLmRhdGUuZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgdGhpcy5kYXRlLmRhdGUuc2V0SG91cnModGhpcy5ob3VyLCB0aGlzLm1pbnV0ZSk7XG4gICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKXtcbiAgICBpZih0aGlzLmluaXRlZCl7XG4gICAgICB0aGlzLmRhdGUuZGF0ZS5zZXRIb3Vycyh0aGlzLmhvdXIsIHRoaXMubWludXRlKTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2UoKSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZGF0ZS5kYXRlO1xuICAgIGRhdGEuc2V0SG91cnModGhpcy5ob3VyLCB0aGlzLm1pbnV0ZSk7XG4gICAgdGhpcy5jaGFuZ2VkLmVtaXQoZGF0YSk7XG4gIH1cblxuICBob3VyQ2hhbmdlKCl7XG4gICAgdGhpcy5jaGFuZ2UoKTtcbiAgfVxuICBtaW51dGVDaGFuZ2UoKXtcbiAgICB0aGlzLmNoYW5nZSgpO1xuICB9XG5cbiAgZ2V0VGltZUFyYXlzKCl7XG4gICAgY29uc3QgYXJyID0ge21pbjpbXSxob3VyOltdfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYwOyBpKyspIHtcbiAgICAgIGxldCBrID0gaS50b1N0cmluZygpO1xuICAgICAgayA9IChrLmxlbmd0aD09MSk/ICcwJytrOiBrO1xuICAgICAgbGV0IGl0ZW0gPSB7dmFsOmksIGxhYmVsOmt9XG4gICAgICBhcnJbJ21pbiddLnB1c2goaXRlbSk7XG4gICAgICBpZihpPDI0KXtcbiAgICAgICAgYXJyWydob3VyJ10ucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG59XG4iXX0=