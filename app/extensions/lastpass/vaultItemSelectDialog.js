var VaultItemSelectDialog=function(b,a){Dialog.call(this,b,$.extend(a,{closeButtonEnabled:!0,maximizeButtonEnabled:!0,dynamicHeight:!0,confirmOnClose:!1}))};VaultItemSelectDialog.prototype=Object.create(Dialog.prototype);VaultItemSelectDialog.prototype.constructor=VaultItemSelectDialog;
VaultItemSelectDialog.prototype.setup=function(b,a){if(a.items){for(var c=[],d=0,e=a.items.length;d<e;++d)c.push(a.items[d].newDisplayObject());this.containers.items=new Container(c,$.extend(a.buildOptions,{display:VaultItemBaseDisplay.prototype.DISPLAY_LIST,additionalItemClasses:"dialogItem noItemButtons",allowDrag:!1,publishSelect:!1}));this.containers.items.initialize(b.find(".vaultItemSelectDialogContainer").get(0))}LPTools.setContent(b.find(".vaultItemSelectDialogText"),a.text);this.nextButton.text(a.nextButtonText||
Strings.Vault.SAVE);this.backButton.text(a.backButtonText||Strings.Vault.CANCEL);Dialog.prototype.setup.apply(this,arguments)};VaultItemSelectDialog.prototype.close=function(b){Dialog.prototype.close.apply(this,arguments);!b&&"function"===typeof this.data.closeHandler&&this.data.closeHandler()};
VaultItemSelectDialog.prototype.handleSubmit=function(b,a){if("function"===typeof a.handler){var c=this.containers.items.getSelectedModelItems();0<c.length?(a.handler(c),this.inProcess()||this.close(!0)):dialogs.alert.open({title:Strings.Vault.ERROR,text:Strings.translateString("You must select an item.")})}};
