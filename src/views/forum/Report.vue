<template>
<ion-row  style="margin-top: 32px">
<ion-col>
<img src="svg/arrow_back.svg"  @click="$router.go(-1)" style="margin-left: 26px;">
</ion-col>
<ion-col>
<img src="svg/logo_dashboard.svg" style="margin-left: -68px;">
</ion-col>
</ion-row>

<ion-content class="ion-padding">
	<center>
		<p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 22px;color: #000000;">
			Reportar una publicación 
		</p>

		<p style="font-family: Segoe UI;font-style: normal;font-weight: 500;font-size: 20px;line-height: 32px;color: #6D6D6D;">
			Áyudanos a entender <br> el problema
		</p>
	</center>
	<ion-radio-group value="Nuevo" v-model="report_reason_id">
	
	<template v-for="report_reason in report_reasons" :key="report_reason">
		<div style="display: flex;justify-content: center;" >
			<div style="display: flex;flex-direction: row;align-items: center;padding: 18px  18px  18px  18px ;width: 311px;height: auto;background: #F8F8FC;border: 1px solid #6D6D6D;box-sizing: border-box;border-radius: 6px;">
				<ion-radio  name="spam"  :value="report_reason.id" @click="report_reason_id = report_reason.id"></ion-radio>
				<p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;color: #333333;flex: none;order: 1;flex-grow: 0;margin: 0px 10px;width: 200px;">
			{{report_reason.item}}
			</p>
			</div>
		</div>
		<br>
	</template>	
		<!--
		<div style="display: flex;justify-content: center;" >
			<div style="display: flex;flex-direction: row;align-items: center;padding: 12px 8px 12px 12px;width: 311px;height: 66px;background: #F8F8FC;border: 1px solid #6D6D6D;box-sizing: border-box;border-radius: 6px;">
				
				<ion-radio  name="spam"  value="1"></ion-radio>
				<p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;color: #333333;flex: none;order: 1;flex-grow: 0;margin: 0px 10px;">
			No me interesa este tipo de <br> publicaciones
			</p>
			</div>
		</div>
		<br>
		<div style="display: flex;justify-content: center;" >
			<div style="display: flex;flex-direction: row;align-items: center;padding: 12px 8px 12px 12px;width: 311px;height: 66px;background: #F8F8FC;border: 1px solid #6D6D6D;box-sizing: border-box;border-radius: 6px;">
				<ion-radio  name="spam"  value="2"></ion-radio>
				<p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;color: #333333;flex: none;order: 1;flex-grow: 0;margin: 0px 10px;">
			No es académico,<br> es SPAM
			</p>
			</div>
		</div>
		<br>
		<div style="display: flex;justify-content: center;" >
			<div style="display: flex;flex-direction: row;align-items: center;padding: 12px 8px 12px 12px;width: 311px;height: 66px;background: #F8F8FC;border: 1px solid #6D6D6D;box-sizing: border-box;border-radius: 6px;">
				<ion-radio name="spam"  value="3"></ion-radio>
				<p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;color: #333333;flex: none;order: 1;flex-grow: 0;margin: 0px 10px;">
			Expresa intenciones de <br>discriminación
			</p>
			</div>
		</div>-->
		<br>
		<div align="center"> 
			<button class="button-primary font-button" @click="postReport">Reportar publicación</button> 
			<p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 26px;text-align: center;color: #000000;">
				Para más infomación sobre advertencia y <br> sanciones, click <a href="">aquí</a> 
			</p>
		</div>
	</ion-radio-group>
</ion-content>
</template>

<script>
import { IonContent} from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios'
import toast from '@/toast'
import { mapGetters } from 'vuex'

export default defineComponent({
	name: 'Popover',
	components: { IonContent },
	data(){
	return {
		report_reasons : [],
		report_reason_id : null,
		post_id : null
	}
	},
	mounted(){
		this.getReportReasons()
		this.post_id = this.$route.params.comment_id
	},
	computed : {
	...mapGetters([
	'getUser'
	]),
	},
	methods :{
		getReportReasons(){
			axios
			.get("/report-reasons")
			.then(res => {
				this.report_reasons = res.data.data
			})
			.catch(err => {
				console.log(err)
			});
		},
		async postReport(){
			let loading = await toast.showLoading()

			await loading.present()

			let data = {
				reason_id : this.report_reason_id,
				//reported_by : this.getUser.id,
				post_id :this.post_id
			}  

			axios
			.post("/reports",data)
			.then(res => {
				loading.dismiss()
				this.$router.push({name : 'dashboard',query :{message :"Reporte registrado existosamente"}})
				console.log(res)
			})
			.catch(err => {
				loading.dismiss()
				console.log(err)
			});
		}
	},
});
</script>
<style type="text/css">
	.radio-icon{
		border: 3px solid #333333;
		box-sizing: border-box;
	}
</style>

