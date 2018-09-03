import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { forwardRef, Component, OnInit } from '@angular/core';
import { DefaultControlValueAccessor } from '../default-control-value-accessor';



@Component({
  selector: 'rich-text-editor',
  templateUrl: 'richtexteditor.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true
    }
  ]
})
export class RichTextEditorComponent extends DefaultControlValueAccessor implements OnInit {

  editorControl = new FormControl();

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'outdent', 'indent', 'insertTable', 'html'],
    toolbarButtonsXS: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'outdent', 'indent', 'insertTable', 'html'],
    toolbarButtonsSM: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'outdent', 'indent', 'insertTable', 'html'],
    toolbarButtonsMD: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'outdent', 'indent', 'insertTable', 'html'],
  };

  ngOnInit(): void {
    this.editorControl.valueChanges.subscribe((value: string) => {
      this.value = value;
    });
  }

  writeValue(value: string) {
    this.editorControl.setValue(value, { emitEvent: false });
  }
}
