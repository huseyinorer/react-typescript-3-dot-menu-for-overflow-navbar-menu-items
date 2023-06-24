import React, { useEffect } from "react";

export interface IMenuItemModel {
    id:number;
    name: string;
    path: string;
}

let menuItems: IMenuItemModel[] = [
    {
        id:1,
        name: 'Menu Item 1',
        path: '/',
    },
    {
        id:2,
        name: 'Menu Item 2',
        path: '/',
    },
    {
        id:3,
        name: 'Menu Item 3',
        path: '/',
        component: testpage
    },
    {
        id:4,
        name: 'Menu Item 4',
        path: '/',
    },
    {
        id:5,
        name: 'Menu Item 5',
        path: '/',
    },
    {
        id:6,
        name: 'Menu Item 6',
        path: '/',
    },
    {
        id:7,
        name: 'Menu Item 7',
        path: '/',
        component: testpage
    },
    {
        id:8,
        name: 'Menu Item 8',
        path: '/',
        component: testpage
    },
    {
        id:9,
        name: 'Menu Item 9',
        path: '/',
        component: testpage
    },
    {
        id:10,
        name: 'Menu Item 10',
        path: '/',
    },
    {
        id:11,
        name: 'Menu Item 11',
        path: '/',
    }
];



class MenuItems {
    CurrentMenuItems = (): IMenuItemModel[] => {
        return menuItems;
    }
}


export default new MenuItems();
