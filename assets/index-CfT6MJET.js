import{F as a,r as i,j as e,I as l,a7 as m,B as r,a3 as n}from"./index-Cx87p-UX.js";import{A as u}from"./index-DukrPgDz.js";import{R as d}from"./UserOutlined-BfU87Zpg.js";function v(){const[s]=a.useForm();console.log("render userinfo");const o={address:"Wolf Street 1234, New York, USA",email:"superadmin@gmail.com",username:"superadmin"};return i.useEffect(()=>(s.setFieldsValue(o),console.log("useEffect userinfo"),()=>{console.log("unmount userinfo")}),[]),e("div",{className:"w-full h-full overflow-auto p-4"},e("div",{className:"flex flex-col gap-4"},e("div",{className:"flex flex-col gap-2"},e("div",{className:"text-2xl font-bold"},"User Info"),e("div",{className:"text-sm text-gray-500"},"This is your user info. You can change your info here."))),e(n,null),e("div",{className:"mt-4"},e(a,{layout:"vertical",form:s},e("div",{className:"mb-4"},e("div",{className:""},e(u,{size:100,icon:e(d,null)}))),e("div",{className:"grid pad:grid-cols-1 desktop:grid-cols-2 grid-cols-4 gap-x-[20px]"},e(a.Item,{label:"Username",name:"username"},e(l,{placeholder:"Username"})),e(a.Item,{label:"Email",name:"email",rules:[{required:!0,message:"Please input your email!"}]},e(l,{placeholder:"Email"}))),e("div",null,e(a.Item,{label:"Address",name:"address"},e(l.TextArea,{rows:4,value:"Wolf Street 1234, New York, USA"}))),e("div",{className:"flex justify-start"},e(m,null,e(r,{type:"primary",htmlType:"submit",onClick:()=>{s.validateFields().then(t=>{console.log(t)})}},"Save"),e(r,{type:"default",htmlType:"reset"},"Reset"))))))}export{v as default};
