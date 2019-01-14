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

  ngOnInit(): void {
    this.editorControl.valueChanges.subscribe((value: string) => {
      this.value = value;
    });
  }

  writeValue(value: string) {
    this.editorControl.setValue(value, { emitEvent: false });
  }
}
