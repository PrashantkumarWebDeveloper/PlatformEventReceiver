({
	getPayloads : function(component, event, helper) {
        component.set('v.isDisabled', true);
        component.set('v.message', 'Subscribing Channel..');
		helper.subscribe(component, helper);
	},
    reset: function(component, event, helper){
        component.set('v.isDisabled', false);
        component.set('v.channel', '/event/');
        component.set('v.replayId', -2);
        component.set('v.message', '');
        component.set('v.payloads', null);
        if(component.get('v.subscription'))
        	helper.unsubscribe(component);
    }
})