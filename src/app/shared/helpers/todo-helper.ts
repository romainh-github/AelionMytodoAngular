import { MatTableHelper } from './mat-table-helper';


export class TodoHelper extends MatTableHelper {

    public constructor() {
        super(); // instancie class parente
        // add an element in the map
        // this element is the map element for title in the table : Map<'title',{title, always etc...}>
        this.todoTableMap.set(
            'title',
            {title: 'A faire', always: true, value: 'title', isDisplayed: true}
        );
        this.todoTableMap.set(
            'start',
            {title: 'Début', always: false, value: 'start', isDisplayed: true}
        );
        this.todoTableMap.set(
            'end',
            {title: 'Fin', always: false, value: 'end', isDisplayed: true}
        );
        this.todoTableMap.set(
            'edit',
            {title: '', always: true, value: 'edit', isDisplayed: true}
        );
        this.todoTableMap.set(
            'delete',
            {title: '', always: true, value: 'delete', isDisplayed: true}
        );
    }

}
