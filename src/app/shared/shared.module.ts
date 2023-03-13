/** Angular core */
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

/** Librerías */
import { DynamicDialogModule } from 'primeng/dynamicdialog'
import { ToastModule } from 'primeng/toast'
import { SliderModule } from 'primeng/slider'
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { PaginatorModule } from 'primeng/paginator'
import { TooltipModule } from 'primeng/tooltip'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    DynamicDialogModule,
    SliderModule,
    ToastModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    PaginatorModule,
    TooltipModule,
    ProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    DynamicDialogModule,
    SliderModule,
    ToastModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    PaginatorModule,
    TooltipModule,
    ProgressSpinnerModule
  ]
})
export class SharedModule { }
