({
	subscribe : function(component, helper) {
		// Get the empApi component
        const empApi = component.find('empApi');
        if (!empApi) return;
        // Get the channel from the input box
        const channel = component.get('v.channel');
        // Replay option to get new events
        const replayId = component.get('v.replayId');
        // Subscribe to an event
         empApi.subscribe(channel, replayId, $A.getCallback(function(eventReceived) {
             var payloads = component.get('v.payloads') || [];
             payloads.push({data: JSON.stringify(eventReceived, null, '    '), time: new Date(eventReceived.data.payload.CreatedDate)});
			 component.set('v.payloads',payloads);          
        })).then(subscription => {
            // Confirm that we have subscribed to the event channel.
            // We haven't received an event yet.
            console.log('Subscribed to channel ', subscription.channel);
            // Save subscription to unsubscribe later
            component.set('v.subscription', subscription);
            component.set('v.message', 'Subscribed to channel!');
        });
	},
	unsubscribe: function(component) {
        const empApi = component.find('empApi');
        const subscription = component.get('v.subscription');
        if (subscription) {
            empApi.unsubscribe(subscription, $A.getCallback(unsubscribed => {
                console.log('Unsubscribed from channel ' + unsubscribed.subscription);
                component.set('v.subscription', null);
                component.set('v.message', 'Unsubscribed from channel!');
            }));
        }
    },
})