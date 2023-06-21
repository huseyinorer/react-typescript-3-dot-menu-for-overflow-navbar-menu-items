import React, { useEffect } from "react";
import testpage from "../testpage";

export interface IMenuItemModel {
    id:number;
    name: string;
    path: string;
    component: React.FC;
    subMenu?: IMenuItemModel[];
}

let menuItems: IMenuItemModel[] = [
    {
        id:1,
        name: 'Menu Item 1',
        path: '/',
        component: testpage
    },
    {
        id:2,
        name: 'Menu Item 2',
        path: '/',
        component: testpage
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
        component: testpage
    },
    {
        id:5,
        name: 'Menu Item 5',
        path: '/',
        component: testpage
    },
    {
        id:6,
        name: 'Menu Item 6',
        path: '/',
        component: testpage
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
        component: testpage
    },
    {
        id:11,
        name: 'Menu Item 11',
        path: '/',
        component: testpage
    }
];



class MenuItems {
    CurrentMenuItems = (): IMenuItemModel[] => {
        return menuItems;
    }
}


export default new MenuItems();