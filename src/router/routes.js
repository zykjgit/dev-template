const exampleOne = () => import('@/views/exampleOne/index.vue');
const groupExmapl = () => import('@/views/groupExample/example/index.vue');
const exampleTwo = () => import('@/views/groupExample/exampleTwo/index.vue');
const layout = () => import('@/views/layout/index.vue');

export const dynamicRoutes = [
  {
    path: '/example-one',
    component: layout,
    children: [
      {
        path: 'index',
        component: exampleOne,
        name: 'exampleOne',
        meta: {
          name: '用例1'
        }
      }
    ]
  },
  {
    path: '/group-example',
    component: layout,
    meta: {
      name: '分组实例'
    },
    children: [
      {
        path: 'example',
        component: groupExmapl,
        name: 'groupExample',
        meta: {
          name: '分组实例'
        }
      },
      {
        path: 'example-two',
        component: exampleTwo,
        name: 'exampleTwo',
        meta: {
          name: '分组实例2'
        }
      }
    ]
  }
];

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    component: layout
  },
  ...dynamicRoutes,
  {
    path: '*',
    redirect: '/home'
  }
];

// export const roles = [
//   {
//     path: 'userManage'
//   },
//   {
//     path: 'orderManage'
//   },
//   {
//     path: 'studentManage'
//   },
//   {
//     path: 'updateManage',
//     children: [
//       {
//         path: 'androidManage'
//       }
//     ]
//   },
//   {
//     path: 'advertisingManage',
//     children: [
//       {
//         path: 'bannerManage'
//       }
//     ]
//   },
//   {
//     path: 'configManage',
//     children: [
//       {
//         path: 'organizationManage'
//       },
//       {
//         path: 'accountManage'
//       },
//       {
//         path: 'enterpriseManage'
//       }
//     ]
//   }
// ];
export default routes;
