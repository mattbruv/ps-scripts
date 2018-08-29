var docRef = app.activeDocument;

cTID = x => app.charIDToTypeID(x)
sTID = x => app.stringIDToTypeID(x)

function newGroupFromLayers(doc) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(sTID('layerSection'));
    desc.putReference(cTID('null'), ref);
    var lref = new ActionReference();
    lref.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc.putReference(cTID('From'), lref);
    executeAction(cTID('Mk  '), desc, DialogModes.NO);
};

function undo() {
   executeAction(cTID('undo', undefined, DialogModes.NO));
};

function getSelectedLayers(doc) {
  var selLayers = [];
  newGroupFromLayers();
  var group = doc.activeLayer;
  var layers = group.layers;
  layers.map(x => selLayers.push(x))
  undo();
  return selLayers;
};

function main() {
    let selectedLayers = getSelectedLayers(app.activeDocument);
    let inc = prompt('Enter the number to add or subtract from each selected layer\nExample: 2 or -2', '1')
    let increment = parseInt(inc)
    selectedLayers = selectedLayers.filter(x => x.typename == 'ArtLayer' && x.kind == LayerKind.TEXT)

    selectedLayers.map(function(layer) {
        number = parseInt(layer.textItem.contents)
        layer.textItem.contents = number + increment
    })
}

app.activeDocument.suspendHistory("Text Increment Script", "_main()")