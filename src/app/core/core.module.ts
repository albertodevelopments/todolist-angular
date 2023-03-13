/** Angular core */
import { NgModule } from '@angular/core'
import { CoreComponent } from './core.component'
import { CoreRoutingModule } from '@core/core-routing.module'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

/** App imports */
import { SharedModule } from '@shared/index'

@NgModule({
  declarations: [
    CoreComponent,
  ],
  imports: [
    SharedModule,
    CoreRoutingModule,
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule { }

