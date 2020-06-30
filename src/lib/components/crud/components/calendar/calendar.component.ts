import { Component } from '@angular/core';
import { provideValueAccessor } from '@nuvem/angular-base';
import { FieldComponent } from '../field.component';
import { CALENDAR_LOCALE } from './calendar-locale';
@Component({
  selector: '[nCalendar]',
  templateUrl: './calendar.component.html',
  providers: [provideValueAccessor(CalendarComponent)]
})
export class CalendarComponent extends FieldComponent<string, Date> {
  ptBR = CALENDAR_LOCALE;

  protected outerToInner(value: string): Date {
    return value ? new Date(value) : null;
  }
}
