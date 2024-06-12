import {
  Component,
  Inject,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ChangeDetectorRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements AfterViewInit {
  @ViewChild('dynamicContent', { read: ViewContainerRef })
  dynamicContent!: ViewContainerRef;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.loadFormComponent();
  }

  loadFormComponent(): void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(FormComponent);
    const componentRef = this.dynamicContent.createComponent(componentFactory);
    componentRef.instance.formType = this.data.formType;
    componentRef.instance.data = this.data.data;
    this.cdr.detectChanges();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
