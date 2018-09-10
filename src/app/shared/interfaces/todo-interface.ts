export interface TodoInterface {
    /**
     * Titre du todo
     * @var String
     */
    title: String;
    /**
     * @var boolean vrai si checkbox est checked
     */
    isChecked: boolean;
    /**
     * @var start Starting date of Todo
     */
    start: Date;
    /**
     * @var end Ending date of todo
     */
    end: Date;


}
