<template>

<ion-app :class="{'ios' : showAppleSignIn }" v-if="route.meta.layout == 'Layout-No-Header'">
	<TheContainerNoHeader></TheContainerNoHeader>
</ion-app>
<ion-app :class="{'ios' : showAppleSignIn }" v-if="route.meta.layout =='Layout'">
	<TheContainerLayout></TheContainerLayout>
</ion-app>
<ion-app :class="{'ios' : showAppleSignIn }" v-else>

	<TheContainer></TheContainer>
</ion-app>

</template>

<script>
import { defineComponent } from 'vue';
import io from '@/plugins/socket-io'
import fcm_token from '@/plugins/fcm/fcm-token' ; 
import  '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications';
import toast from '@/toast'
import TheContainer from './components/TheContainer'
import TheContainerLayout from './components/TheContainerLayout'
import TheContainerNoHeader from './components/TheContainerNoHeader'
//import { useBackButton } from '@ionic/vue';

export default defineComponent({
  name: 'App',
  components : {TheContainer,TheContainerLayout,TheContainerNoHeader},
  data(){
	return {
		route : this.$route,
		showAppleSignIn : true,
		redirections : 0
		//fcm: new FCM()
		}
	} ,
 mounted(){ 
	io.connect()
	this.initPushNotification()
  },
  methods : {
  async initPushNotification(){

	// Register with Apple / Google to receive push via APNS/FCM

	PushNotifications.requestPermissions().then(result => {
	if (result.receive === 'granted') {
	PushNotifications.register();
	}
	});

	// On success, we should be able to receive notifications
	PushNotifications.addListener('registration', 
		(token) => {
			fcm_token.setToken(token.value)
		}
	);

	// Some issue with our setup and push will not work
	PushNotifications.addListener('registrationError', 
		(error) => {
			//alert(JSON.stringify(error))
			console.log(error)
		}
	);

	// Show us the notification payload if the app is open on our device
	PushNotifications.addListener('pushNotificationReceived', 
		(notification) => {
			if(notification.data['message']){
				toast.openToast(notification.data['message'],"success",10000);
			}
		}
	);

	// Method called when tapping on a notification
	PushNotifications.addListener('pushNotificationActionPerformed', 
		(notification) => {
			let path = notification.notification.data['path']
			if (path) {
				this.$router.push(JSON.parse(path))
			}
		}
	);
	}
  }
});

</script>

<style>

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>