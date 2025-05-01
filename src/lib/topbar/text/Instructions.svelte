<p>
    A circuit may consist of one or multiple components, a component may consist of other components. The elementary unit of a component is the gate. One may use predefined gates to create a component or their own custom components. When using custom components make sure not to create circular dependencies!
</p>
<p>
    Gates can be selected in the drop down menu or by pressing a button on the keyboard mapped to a specific gate. Once a gate is selected one can place it with a left mouse button click inside the component. The gate will be placed according to a grid layout to the nearest edge. Gates that span more than one qubit, such as control gates, might require multiple clicks to be placed.
</p>
<p>
    Components are provided with vertical grey auxiliary lines marking a column. There can only be one gate per column. Placing a gate in a column that already has a gate will delete the original gate. Considering gates that require multiple clicks to be placed, the first click always determines the column such that the second click will always be considered to be in the same column.
</p>
<p>
    Clicking on a placed gate opens a dialog window showing relevant information. Here the gate can be removed from the component.
</p>

<style>
    p {
        text-align: left;
        margin: 1em;
    }
</style>