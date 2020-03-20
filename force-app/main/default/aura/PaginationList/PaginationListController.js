({
    doInit : function(component, event, helper) {
        helper.fetchRecords(component, event, helper);
    },
    
    onPrev : function(component, event, helper) {
		helper.onPrev(component, event, helper);
    },
    
    onNext : function(component, event, helper) {
		helper.onNext(component, event, helper);
    },
    
    onEnter : function(component, event, helper) {
		helper.onEnter(component, event, helper);
    },
})