# Portfolio tracking website

### Website created using MySQL, Express, React and Node

#### Key Features: 
1. Extract data from a database grid and export it into an Excel and/or PDF file
   * The 2 react components were created in the functionality folder
   * The 2 buttons were added to the portfolio details page
     * On clicking 'Export PDF' button, PDF file gets downloaded to device in the specified format
     * On clicking 'Export Excel' button, Excel file gets downloaded to device in the specified format

2. Dynamic tooltip component
   * Tooltip can be used with any component on page by wrapping it around the desired component/element
   * It can have any title and any text within due to props passed
     * Need to specify desired title text and content text when wrapping around any componenet/element
   * Tooltip open and close properties:
     * Open on hovering over component/element it is wrapped around
     * Open while hovering off of component onto tooltip
     * Open while hovering inside tooltip
     * Closes on hovering off of wrapped component
     * Closes on hovering off of tooltip
     * Can also be closed with 'X' icon in top right corner of tooltip

#### TO-DO
1. Excel and PDF export components
   * Make both functionalities dynamically available to be able to use it for any database
     * Any table and filename can be passed into the componenets using the 'exportData' & 'fileName' props but headers are hard-coded
     * Pass props in both components to get headers and number of columns in table
     * In 'ExportEXC', pass props to get the minimum width of columns according to length of data in database
