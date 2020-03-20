({
    fetchRecords : function(component, event, helper) {
        var action = component.get("c.getRecords");
        
        action.setCallback(this, function(response){
            var state = response.getState();
            
            if(state === 'SUCCESS' || state === 'DRAFT') {
                var result = response.getReturnValue();
                console.log("Result:::", result);
                component.set("v.recordList", result);
                //component.set("v.paginationList", result);
                helper.paginator(component, event, helper);
            }
            else {
                console.log("Error:::", response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    paginator : function(component, event, helper) {
        let recordList = component.get("v.recordList");
        let paginationList = [];
        let pageSize = component.get("v.pageSize");
        let noOfPages = component.get("v.noOfPages");
        let pageNumber = component.get("v.pageNumber");
        let totalSize = (recordList !== undefined && recordList !== null) ? recordList.length : 0;
        component.set("v.totalSize", totalSize);
        //console.log("paginationList totalSize", totalSize);
        
        if(totalSize > 0 && pageSize != undefined) {
            noOfPages = Math.ceil(totalSize/pageSize);
            component.set("v.noOfPages", noOfPages);
            //console.log("noOfPages:::", noOfPages);
            let paginationMap = new Map()
            for(let i = 0; i < noOfPages; i++) { 
                paginationMap.set(i+1,recordList.splice(0,pageSize));
            }
            console.log("paginationMap:::", paginationMap);
            component.set("v.paginationMap", paginationMap);
            pageNumber = 1;
            component.set("v.pageNumber", pageNumber);
            console.log("paginationMap.get(0):::", paginationMap.get(pageNumber));
            paginationList = paginationMap.get(pageNumber);
            component.set("v.paginationList", paginationList);
        }
    },
    
    onPrev : function(component, event, helper) {
        var pageNumber = component.get("v.pageNumber") - 1;
        component.set("v.pageNumber", pageNumber);
        var paginationMap = component.get("v.paginationMap");
        component.set("v.paginationList", paginationMap.get(pageNumber));
        console.log("pageNumber::::",pageNumber);
    },
    
    onNext : function(component, event, helper) {
        var pageNumber = component.get("v.pageNumber") + 1;
        component.set("v.pageNumber", pageNumber);
        var paginationMap = component.get("v.paginationMap");
        component.set("v.paginationList", paginationMap.get(pageNumber));
        console.log("pageNumber::::",pageNumber);
    },
    
    onEnter : function(component, event, helper) {
        if(event.which == 13) {
            //alert("Enter key pressed!");
            var noOfPages = component.get("v.noOfPages");
            var pageNumber = component.find("search").get("v.value");
            //var pageNumber = component.get("v.pageNumber");
            //console.log("pageNumber", pageNumber);
            if(pageNumber > 1 ) {
                component.set("v.pageNumber", pageNumber);
                var paginationMap = component.get("v.paginationMap");
                console.log("paginationMap", paginationMap.get(pageNumber));
                component.set("v.paginationList", paginationMap.get(pageNumber));
                console.log("pageNumber::::",pageNumber);
            }
        } 
    },
})