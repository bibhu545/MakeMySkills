import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';
import { OptionModel } from 'src/app/Utils/Models';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.css']
})
export class UpdateTestComponent implements OnInit {

  options: OptionModel[] = [];

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.populateInitialOptions();
  }

  populateInitialOptions() {

    var blankOption = new OptionModel();
    blankOption.id = this.options.length + 1;
    blankOption.optionLabel = 'Option ' + blankOption.id + ':';
    this.options.push(blankOption);

    var blankOption = new OptionModel();
    blankOption.id = this.options.length + 1;
    blankOption.optionLabel = 'Option ' + blankOption.id + ':';
    this.options.push(blankOption);

  }

  addOptions() {
    var newOption = new OptionModel();
    newOption.id = this.options.length + 1;
    newOption.optionLabel = 'Option ' + newOption.id + ':';
    this.options.push(newOption);
  }

  deleteOption(id: number) {
    this.options.splice(id, 1);
    this.options.forEach((element, index) => {
      element.id = index + 1;
      element.optionLabel = 'Option ' + element.id + ':';
    });
  }

  openQuestionModal(template: TemplateRef<any>) {
    this.modalService.showModal(template, { class: 'modal-lg' });
  }

  closeQuestionModal() {
    this.modalService.closeModal();
  }

}
