import { Component } from '@angular/core';
// Interfaces
import { IProject } from '../../interfaces/project/project';

@Component({
    selector: 'project'
})

export class ProjectComponent implements IProject {
    id;
    name;
    pages;
}
