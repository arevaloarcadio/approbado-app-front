import { createRouter, createWebHistory } from '@ionic/vue-router';
//import { RouteRecordRaw } from 'vue-router';

const GetStarted = () =>  import('@/views/pages/GetStarted')
const PreLogin = () =>  import('@/views/pages/PreLogin')
const Login = () =>  import('@/views/pages/Login')
const Register = () =>  import('@/views/pages/Register')
const CompleteProfile = () =>  import('@/views/pages/CompleteProfile')
const ConfirmIdentity = () =>  import('@/views/pages/ConfirmIdentity')
const ForgetPassword = () =>  import('@/views/pages/ForgetPassword')
const ForgetPasswordSend = () =>  import('@/views/pages/ForgetPasswordSend')
const ForgetPasswordSuccess = () =>  import('@/views/pages/ForgetPasswordSuccess')

const Dashboard = () =>  import('@/views/dashboard/Dashboard')
const CurrentEvent = () =>  import('@/views/dashboard/CurrentEvent')
const DetailsTrivia = () =>  import('@/views/dashboard/DetailsTrivia')
const DetailsGroupTrivia = () =>  import('@/views/trivia/DetailsGroupTrivia')
const WinnersGroupTrivia = () =>  import('@/views/trivia/WinnersGroupTrivia')

const CreateEventCalendar = () =>  import('@/views/event/CreateEventCalendar')
const AddEvent = () =>  import('@/views/event/AddEvent')
const AddEventStepTwo = () =>  import('@/views/event/AddEventStepTwo')
const AddEventStepThree = () =>  import('@/views/event/AddEventStepThree')
const RegisterSuccess = () =>  import('@/views/event/RegisterSuccess')
const EditEventTrivia = () =>  import('@/views/event/EditEventTrivia')
const RemoveEventTrivia = () =>  import('@/views/event/RemoveEventTrivia')


const Profile = () =>  import('@/views/profile/Profile')
const UserProfile = () =>  import('@/views/profile/UserProfile')
const EditProfile = () =>  import('@/views/profile/EditProfile')
const DataContact = () =>  import('@/views/profile/DataContact')
const Ocupation = () =>  import('@/views/profile/Ocupation')
const SocialNetwork = () =>  import('@/views/profile/SocialNetwork')
const Setting = () =>  import('@/views/profile/Setting')
const SettingPrivacy = () =>  import('@/views/profile/SettingPrivacy')
const SettingNotification = () =>  import('@/views/profile/SettingNotification')
const SettingAccount = () =>  import('@/views/profile/SettingAccount')
const SettingSecurity = () =>  import('@/views/profile/SettingSecurity')
const SettingPlan = () =>  import('@/views/profile/SettingPlan')

const Notification = () =>  import('@/views/notification/Index')
const DetailsNotification = () =>  import('@/views/notification/DetailsNotification')

const Forum = () =>  import('@/views/forum/Index')
const ForumDetails = () =>  import('@/views/forum/ForumDetails')
const ForumReport = () =>  import('@/views/forum/Report')
const CreateForum = () =>  import('@/views/forum/CreateForum')
const EditForum = () =>  import('@/views/forum/EditForum')
const ForumSuccess = () =>  import('@/views/forum/ForumSuccess')

const TheContainer = () =>  import('@/components/TheContainer')
//const TheContainerLayout = () =>  import('@/components/TheContainerLayout')
//const TheContainerNoHeader = () =>  import('@/components/TheContainerNoHeader')

const Message = () =>  import('@/views/message/Index')
const ViewMessage = () =>  import('@/views/message/View')

const Trivia = () =>  import('@/views/trivia/Index')
const DetailsTriviaThemes = () =>  import('@/views/trivia/DetailsTriviaThemes')
const SelectDifficulty = () =>  import('@/views/trivia/SelectDifficulty')
const BeforeBegin = () =>  import('@/views/trivia/BeforeBegin')
const AddUserTriviaGroup = () =>  import('@/views/trivia/AddUserTriviaGroup')
const Answers = () =>  import('@/views/trivia/Answers')
const ResultTrivia = () =>  import('@/views/trivia/ResultTrivia')
const Congratulation = () =>  import('@/views/trivia/Congratulation')
const CreatingRoom = () =>  import('@/views/trivia/CreatingRoom')
const UserResult = () =>  import('@/views/trivia/UserResult')

const routes = [ 
{
  path: '/dashboard',
  name: 'dashboard',
  component: Dashboard,
  meta : {layout : 'Layout'},
},
{
  path: '/notification',
  name: 'notification',
  component: Notification,
  meta : {layout :  'Layout-No-Header'},
},
{
  path: '/notification/details',
  name: 'notification.details',
  component: DetailsNotification,
  meta : {layout :  'Layout-No-Header'},
},
{
  path: '/forum',
  name: 'forum',
  component: Forum,
  meta : {layout :  'Layout-No-Header'},
},
{
  path: '/profile',
  name: 'profile',
  component: Profile,
  meta : {layout : 'Layout-No-Header'},
},
{
  path: '/profile/:user_id',
  name: 'user.profile',
  component: UserProfile,
  meta : {layout : 'Layout-No-Header'},
},
{
  path: '/message',
  name: 'message',
  component: Message,
  meta : {layout : 'Layout-No-Header'},
},
{
  path: '/trivia',
  name: 'trivia',
  component: Trivia,
  meta : {layout : 'Layout-No-Header'},
},
{
  path: '/details_trivia_themes/:trivia_id',
  name: 'details_trivia_themes',
  component: DetailsTriviaThemes,
  meta : {layout : null},
},
{
  path: '/select_difficulty_themes/:trivia_id',
  name: 'select_difficulty_themes',
  component: SelectDifficulty,
  meta : {layout : null},
},
{
  path: '/before_begin/:trivia_id',
  name: 'before_begin',
  component: BeforeBegin,
  meta : {layout : null},
},
{
  path: '/add_user_trivia_group/:trivia_id',
  name: 'add_user_trivia_group',
  component: AddUserTriviaGroup,
  meta : {layout : null},
},
{
        path: '/get_started',
        name: 'get_started',
        component: GetStarted,
        meta : {layout : null},
      },
      {
        path: '/pre_login',
        name: 'pre_login',
        component: PreLogin,
        meta : {layout : null},
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta : {layout : null },
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        meta : {layout : null},
      },
      {
        path: '/complete_profile',
        name: 'complete_profile',
        component: CompleteProfile,
        meta : {layout : null},
      },
      {
        path: '/comfirm_profile',
        name: 'comfirm_profile',
        component: ConfirmIdentity,
        meta : {layout : null},
      },
      {
        path: '/forget_password',
        name: 'forget_password',
        component: ForgetPassword,
        meta : {layout : null},
      },
      {
        path: '/forget_password_send',
        name: 'forget_password_send',
        component: ForgetPasswordSend,
        meta : {layout : null},
      },
      {
        path: '/forget_password_success',
        name: 'forget_password_success',
        component: ForgetPasswordSuccess,
        meta : {layout : null},
      },
      {
        path: '/current_event',
        name: 'current_event',
        component: CurrentEvent,
        meta : {layout : null},
      },
      {
        path: '/details_trivia/:trivia_id',
        name: 'details_trivia',
        component: DetailsTrivia,
        meta : {layout : null},
      },
      {
        path: '/details_group_trivia/:trivia_id',
        name: 'details_group_trivia',
        component: DetailsGroupTrivia,
        meta : {layout : null},
      },
      {
        path: '/winners_group_trivia/:trivia_id',
        name: 'winners_group_trivia',
        component: WinnersGroupTrivia,
        meta : {layout : null},
      },
      {
        path: '/create_event',
        name: 'create_event',
        component: CreateEventCalendar,
        meta : {layout : null},
      },
      {
        path: '/add_event',
        name: 'add_event',
        component: AddEvent,
        meta : {layout : null},
      },
      {
        path: '/add_event_step_two',
        name: 'add_event_step_two',
        component: AddEventStepTwo,
        meta : {layout : null},
      },
      {
        path: '/add_event_step_three',
        name: 'add_event_step_three',
        component: AddEventStepThree,
        meta : {layout : null},
      },
      {
        path: '/register_success',
        name: 'register_success',
        component: RegisterSuccess,
        meta : {layout : null},
      },
      {
        path: '/edit_profile',
        name: 'edit_profile',
        component: EditProfile,
        meta : {layout : null},
      },
      {
        path: '/data_contact',
        name: 'data_contact',
        component: DataContact,
        meta : {layout : null},
      },
      {
        path: '/ocupation',
        name: 'ocupation',
        component: Ocupation,
        meta : {layout : null},
      }, 
      {
        path: '/social_network',
        name: 'social_network',
        component: SocialNetwork,
        meta : {layout : null},
      },
      {
        path: '/edit_event_trivia/:trivia_id',
        name: 'edit_event_trivia',
        component: EditEventTrivia,
        meta : {layout : null},
      },
      {
        path: '/remove_event_trivia/:trivia_id',
        name: 'remove_event_trivia',
        component: RemoveEventTrivia,
        meta : {layout : null},
      },
      {
        path: '/setting',
        name: 'setting',
        component: Setting,
        meta : {layout : null},
      },
      {
        path: '/setting/privacy',
        name: 'setting.privacy',
        component: SettingPrivacy,
        meta : {layout : null},
      },
      {
        path: '/setting/notification',
        name: 'setting.notification',
        component: SettingNotification,
        meta : {layout : null},
      },
      {
        path: '/setting/account',
        name: 'setting.account',
        component: SettingAccount,
        meta : {layout : null},
      },
      {
        path: '/setting/security',
        name: 'setting.security',
        component: SettingSecurity,
        meta : {layout : null},
      },
      {
        path: '/setting/plan',
        name: 'setting.plan',
        component: SettingPlan,
        meta : {layout : null},
      },
       {
        path: '/forum/:forum_id',
        name: 'forum.details',
        component: ForumDetails,
        meta : {layout : null},
      },
      {
        path: '/forum/report/:comment_id',
        name: 'forum.report',
        component: ForumReport,
        meta : {layout : null},
      },
      {
        path: '/forum/create',
        name: 'forum.create',
        component: CreateForum,
        meta : {layout : null},
      },
      {
        path: '/forum/edit/:forum_id',
        name: 'forum.edit',
        component: EditForum,
        meta : {layout : null},
      },
      {
        path: '/forum/success',
        name: 'forum.success',
        component: ForumSuccess,
        meta : {layout : null},
      },
      {
        path: '/message/view/:chat_id',
        name: 'message.view',
        component: ViewMessage,
        meta : {layout : null},
      },
      {
        path: '/answers/:subtheme_id',
        name: 'answers',
        component: Answers,
        meta : {layout : null},
      },
      {
        path: '/result/:trivia_id',
        name: 'result.trivia',
        component: ResultTrivia,
        meta : {layout : null},
      },
      {
        path: '/congratulation',
        name: 'congratulation',
        component: Congratulation,
        meta : {layout : null},
      },
      {
        path: '/room/:token',
        name: 'room',
        component: CreatingRoom,
        meta : {layout : null},
      },
      {
        path: '/user_result/:subtheme_id',
        name: 'user_result',
        component: UserResult,
        meta : {layout : null},
      },
      {
        path: '/',
        component: TheContainer,
      }
/*{
  path: '/the_container_no_header',
  name: 'TheContainerNoHeader',
  component: TheContainerNoHeader,
  children: [ 
    
  ]
},
  {
    path: '/',
    name: 'TheContainer',
    redirect: '/get_started',
    component: TheContainer,
    children: [ 
      
    ]
  }*/
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
