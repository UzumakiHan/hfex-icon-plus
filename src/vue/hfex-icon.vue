<template>
 <component :is="`hfex-icon-${name}`" :width="size" :height="size" :color="color" @click.native="$emit('click')"></component>
</template>

<script>
 import HfexIconClock from '~icons/hfex-icon/clock'; 
 import HfexIconService from '~icons/hfex-icon/service'; 
 import HfexIconEdit from '~icons/hfex-icon/edit'; 
 import HfexIconUpload from '~icons/hfex-icon/upload'; 
 import HfexIconEyeVisible from '~icons/hfex-icon/eye-visible'; 
 import HfexIconSetting from '~icons/hfex-icon/setting'; 
 import HfexIconAdd from '~icons/hfex-icon/add'; 
 import HfexIconEyeHide from '~icons/hfex-icon/eye-hide'; 
 import HfexIconMinus from '~icons/hfex-icon/minus'; 
 import HfexIconAvatar from '~icons/hfex-icon/avatar'; 
 import HfexIconHome from '~icons/hfex-icon/home'; 
 import HfexIconClose from '~icons/hfex-icon/close'; 
 import HfexIconMessage from '~icons/hfex-icon/message'; 
 import HfexIconShare from '~icons/hfex-icon/share'; 
 import HfexIconSearch from '~icons/hfex-icon/search'; 
 import HfexIconQuery from '~icons/hfex-icon/query'; 
 import HfexIconMore from '~icons/hfex-icon/more'; 
 import HfexIconArrowDown from '~icons/hfex-icon/arrow-down'; 
 import HfexIconArrowLeft from '~icons/hfex-icon/arrow-left'; 
 import HfexIconArrowUp from '~icons/hfex-icon/arrow-up'; 
 import HfexIconArrowRight from '~icons/hfex-icon/arrow-right'; 
 import HfexIconScan from '~icons/hfex-icon/scan'; 
 import HfexIconDelete from '~icons/hfex-icon/delete'; 
 
    export default{
        name: 'HfexIcon',
        components:{
          HfexIconClock, 
          HfexIconService, 
          HfexIconEdit, 
          HfexIconUpload, 
          HfexIconEyeVisible, 
          HfexIconSetting, 
          HfexIconAdd, 
          HfexIconEyeHide, 
          HfexIconMinus, 
          HfexIconAvatar, 
          HfexIconHome, 
          HfexIconClose, 
          HfexIconMessage, 
          HfexIconShare, 
          HfexIconSearch, 
          HfexIconQuery, 
          HfexIconMore, 
          HfexIconArrowDown, 
          HfexIconArrowLeft, 
          HfexIconArrowUp, 
          HfexIconArrowRight, 
          HfexIconScan, 
          HfexIconDelete, 
        
        },
        props: {
            name: {
                type: String,
                default: 'home'
            },
            size: {
                type: String,
                default: '28px'
            },
            color: {
                type: String,
                default: '#000'
            }
        },
        emits: {
           click: null
        }
    }
</script>