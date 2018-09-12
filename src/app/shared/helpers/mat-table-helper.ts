import { MatColumns } from './../interfaces/mat-columns';

export class MatTableHelper {

    /**
     * Map for columns
     * @var todoTableMap map of todo table's column
     */
    protected todoTableMap: Map<String, MatColumns> = new Map();



    public getDisplayedColumns(): String[] {
        const toDisplay: String[] = [];

        this.todoTableMap.forEach((column, key) => {
            if (column.isDisplayed) {
                toDisplay.push(column.value);
            }
        });

        return toDisplay;
    }

    public getColumn(key: String): MatColumns {
        return this.todoTableMap.get(key);
    }

    public getOptionalColumns(): MatColumns[] {
        const toDisplay: MatColumns[] = [];
        // attention on cree map avec 1. key et 2. value
        // dans le callback on recoit l'inverse 1.value et 2. key
        this.todoTableMap.forEach((column, key) => {
            if (!column.always) {
                toDisplay.push(column);
            }
        });

        return toDisplay;
    }
    public setDiplayedColumns(userSelection: String[]): String[] {
        this.todoTableMap.forEach((column, key) => {
            if (!column.always) {
                if (userSelection.indexOf(column.value) === -1) {
                    column.isDisplayed = false;
                } else {
                    column.isDisplayed = true;
                }
                this.todoTableMap.set(key, column);
            }
        });
        return this.getDisplayedColumns();
    }

    public optionalColumnsToArray(): String [] {
        const toDisplay: String[] = [];

        this.todoTableMap.forEach((column, key) => {
            if (!column.always) {
                toDisplay.push(column.value);
            }
        });
        return toDisplay;
    }
}
