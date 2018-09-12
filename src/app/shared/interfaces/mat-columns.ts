export interface MatColumns {
    /**
     * @var title: String - Titre de la colonne dans le th
     */
    title: String;
    /**
     * @var always: boolean - Used to determine that the column has to be displayed
     */
    always: boolean;
    /**
     * @var value: String - value used between ng-container and .ts
     */
    value: String;
    /**
     * @var isDisplayed: boolean - true if the column is displayed
     */
    isDisplayed: boolean;
}
