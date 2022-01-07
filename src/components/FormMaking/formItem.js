export const layoutList = [{
        icon: 'fa fa-minus',
        type: 'divider',
        label: '分割线',
        options: {
            orientation: 'left',
            dashed: false,
            hidden: false,
            defaultValue: ''
        }
    },
    {
        icon: 'el-icon-menu',
        type: 'card',
        label: '卡片布局',
        list: [],
        options: {
            bordered: true
        }
    },
    // {
    //     icon: 'el-icon-collection',
    //     type: 'tabs',
    //     label: '标签页布局',
    //     options: {
    //         tabBarGutter: null,
    //         type: 'line',
    //         tabPosition: 'top',
    //         size: 'default',
    //         animated: true
    //     },
    //     columns: [{
    //             value: '1',
    //             label: '选项1',
    //             list: []
    //         },
    //         {
    //             value: '2',
    //             label: '选项2',
    //             list: []
    //         }
    //     ]
    // },
    {
        icon: 'fa fa-th-list',
        type: 'grid',
        label: '栅格布局',
        columns: [{
                span: 12,
                list: []
            },
            {
                span: 12,
                list: []
            }
        ],
        options: {
            type: 'default',
            gutter: 0,
            justify: 'start',
            align: 'top',
            tableStyle: false,
            formBorder: false
        }
    },
    {
        icon: 'fa fa-table',
        type: 'table',
        label: '表格布局',
        trs: [{
                tds: [{
                        options: {
                            colspan: 1,
                            rowspan: 1
                        },
                        list: []
                    },
                    {
                        options: {
                            colspan: 1,
                            rowspan: 1
                        },
                        list: []
                    }
                ]
            },
            {
                tds: [{
                        options: {
                            colspan: 1,
                            rowspan: 1
                        },
                        list: []
                    },
                    {
                        options: {
                            colspan: 1,
                            rowspan: 1
                        },
                        list: []
                    }
                ]
            }
        ],
        options: {
            width: '100%',
            bordered: false,
            bright: false,
            formBorder: false
        }
    }
];
export const customList = [{
        icon: 'fa fa-meh-o',
        label: '图标选择器',
        type: 'icon',
        options: {
            defaultValue: '',
            disabled: false,
            placeholder: '图标选择器',
            hidden: false
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'fa fa-heart-o',
        label: '颜色选择器',
        type: 'color',
        options: {
            defaultValue: 'rgba(85, 170, 255, 0.5)',
            disabled: false,
            hidden: false,
            showprecolor: false,
            showhistorycolor: true,
            formatType: 'hex',
            showPalette: true,
            canMove: true,
            size: 'default'
        }
    }
    // {
    //     icon: 'fa fa-sitemap',
    //     label: '组织机构',
    //     type: 'depart',
    //     options: {
    //         defaultValue: '',
    //         disabled: false,
    //         placeholder: '请选择组织机构',
    //         hidden: false
    //     }
    // },
    // {
    //     icon: 'fa fa-user-o',
    //     label: '人员选择器',
    //     type: 'userPop',
    //     options: {
    //         defaultValue: '',
    //         disabled: false,
    //         placeholder: '请选择用户',
    //         multiple: true,
    //         hidden: false
    //     }
    // }
    // {
    //     icon: 'iconfont iconren-duoren',
    //     label: '省市区',
    //     type: 'area',
    //     options: {
    //         defaultValue: '',
    //         disabled: false,
    //         hidden: false,
    //         areaType: 'select'
    //     }
    // }
];
export const basicList = [{
        icon: 'el-icon-edit',
        type: 'input',
        label: '输入框',
        options: {
            width: '100%',
            defaultValue: '',
            placeholder: '请输入',
            disabled: false,
            hidden: false,
            clearable: false,
            readonly: false
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'el-icon-edit',
        type: 'textarea',
        label: '文本框',
        options: {
            width: '100%',
            minRows: 2,
            maxRows: null,
            defaultValue: '',
            disabled: false,
            hidden: false,
            clearable: false,
            readonly: false,
            placeholder: '请输入'
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'fa fa-slack',
        type: 'number',
        label: '数字输入框',
        options: {
            width: '',
            defaultValue: '',
            min: '',
            max: '',
            step: 1,
            hidden: false,
            disabled: false,
            precision: '',
            controlsPosition: 'right'
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'fa fa-toggle-down',
        type: 'select',
        label: '下拉选择器',
        options: {
            width: '100%',
            multiple: false,
            disabled: false,
            clearable: false,
            hidden: false,
            placeholder: '请选择',
            dynamicKey: 'code:sex',
            dictCode: 'sex',
            method: 'post',
            textFeild: 'text',
            valueFeild: 'value',
            dataType: 'static',
            url: '/system/dicSet/getDicItemByCode',
            options: [{
                    value: 1
                },
                {
                    value: 2
                }
            ],
            filterable: false,
            defaultValue: ''
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'fa fa-check-square',
        type: 'checkbox',
        label: '多选框',
        options: {
            inline: true,
            defaultValue: [],
            dataType: 'static',
            options: [{
                    value: 'Option 1'
                },
                {
                    value: 'Option 2'
                },
                {
                    value: 'Option 3'
                }
            ],
            width: '',
            remote: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label'
            },
            remoteFunc: '',
            disabled: false
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'fa fa-circle-o',
        type: 'radio',
        label: '单选框',
        options: {
            dataType: 'static',
            inline: true,
            defaultValue: '',
            options: [{
                    value: 'Option 1'
                },
                {
                    value: 'Option 2'
                },
                {
                    value: 'Option 3'
                }
            ],
            width: '',
            remote: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label'
            },
            remoteFunc: '',
            disabled: false
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'fa fa-calendar',
        type: 'date',
        label: '日期选择框',
        options: {
            width: '100%',
            defaultValue: '',
            rangeDefaultValue: [],
            range: false,
            showTime: false,
            disabled: false,
            hidden: false,
            clearable: false,
            placeholder: '请选择',
            rangePlaceholder: ['开始时间', '结束时间'],
            format: 'YYYY-MM-DD'
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'fa fa-clock-o',
        type: 'time',
        label: '时间选择框',
        options: {
            width: '100%',
            defaultValue: '',
            disabled: false,
            hidden: false,
            clearable: false,
            placeholder: '请选择',
            format: 'HH:mm:ss',
            use12Hours: false
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'fa fa-star-half-o',
        type: 'rate',
        label: '评分',
        options: {
            defaultValue: 1,
            max: 5,
            disabled: false,
            hidden: false,
            allowHalf: false,
            clearable: false
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'el-icon-s-operation',
        type: 'slider',
        label: '滑动输入条',
        options: {
            width: '100%',
            defaultValue: 1,
            disabled: false,
            hidden: false,
            min: 0,
            max: 100,
            step: 1,
            showInput: false
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    // {
    //     icon: 'el-icon-upload',
    //     type: 'uploadFile',
    //     label: '上传文件',
    //     options: {
    //         defaultValue: '[]',
    //         multiple: false,
    //         disabled: false,
    //         hidden: false,
    //         drag: false,
    //         downloadWay: 'a',
    //         dynamicFun: '',
    //         width: '100%',
    //         limit: 3,
    //         data: '{}',
    //         fileName: 'file',
    //         headers: {
    //             token: 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJ1dWlkIjoiZDI0ZDk1YjI1OGZhNGQ4MmI0OWIwMzg1NmViMjlmZDQiLCJ1c2VyTmFtZUlkIjoiZXdzZDAwMDEiLCJ1c2VyTmFtZSI6Iui2hee6p-euoeeQhuWRmCIsIm9yZ0lkIjoiNCIsInJvbGVJZCI6IjM0LDU0LDU1IiwiY29tcGFueUlkIjoxMCwiZXhwIjoxNjM2OTcwMzIzLCJuYmYiOjE2MzY5NjMxMjMsImlzcyI6InN5c3RlbUp3dCIsImF1ZCI6IjA5OGY2YmNkNDYyMWQzNzNjYWRlNGU4MzI2MjdiNGY2In0.ZpgyfUpVhB5og8S-EtKx_P09h23ftmH9w1sEKk4Wd3I'
    //         },
    //         action: '/system/attachment/upload',
    //         placeholder: '上传'
    //     },
    // },
    // {
    //     icon: 'fa fa-photo',
    //     type: 'uploadImg',
    //     label: '上传图片',
    //     options: {
    //         defaultValue: [],
    //         multiple: false,
    //         hidden: false,
    //         disabled: false,
    //         width: '100%',
    //         data: '{}',
    //         limit: 3,
    //         placeholder: '上传',
    //         fileName: 'file',
    //         headers: {
    //             token: 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJ1dWlkIjoiZDI0ZDk1YjI1OGZhNGQ4MmI0OWIwMzg1NmViMjlmZDQiLCJ1c2VyTmFtZUlkIjoiZXdzZDAwMDEiLCJ1c2VyTmFtZSI6Iui2hee6p-euoeeQhuWRmCIsIm9yZ0lkIjoiNCIsInJvbGVJZCI6IjM0LDU0LDU1IiwiY29tcGFueUlkIjoxMCwiZXhwIjoxNjM2OTcwMzIzLCJuYmYiOjE2MzY5NjMxMjMsImlzcyI6InN5c3RlbUp3dCIsImF1ZCI6IjA5OGY2YmNkNDYyMWQzNzNjYWRlNGU4MzI2MjdiNGY2In0.ZpgyfUpVhB5og8S-EtKx_P09h23ftmH9w1sEKk4Wd3I'
    //         },
    //         action: '/system/attachment/upload',
    //         listType: 'picture-card',
    //         uploadWay: 'archive'
    //     },
    // },
    {
        icon: 'fa fa-tree',
        type: 'treeSelect',
        label: '树选择器',
        options: {
            disabled: false,
            multiple: false,
            hidden: false,
            clearable: false,
            showSearch: false,
            treeCheckable: false,
            placeholder: '请选择',
            method: 'post',
            url: '/mockXHR/portal/getTreeData',
            parameter: '',
            options: [],
            defaultValue: null
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'el-icon-edit',
        type: 'editor',
        label: '富文本',
        options: {
            height: 300,
            placeholder: '请输入',
            defaultValue: '',
            hidden: false,
            disabled: false,
            showLabel: false,
            width: '100%'
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'el-icon-edit',
        type: 'cascader',
        label: '级联选择器',
        options: {
            defaultValue: [],
            width: '',
            placeholder: '',
            disabled: false,
            clearable: false,
            remote: true,
            remoteOptions: [],
            options: {
                value: 'value',
                label: 'label',
                children: 'children'
            },
            remoteFunc: ''
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    {
        icon: 'fa fa-toggle-on',
        type: 'switch',
        label: '开关',
        options: {
            defaultValue: false,
            disabled: false
        },
        rules: [{
            required: false,
            message: '必填项'
        }]
    },
    // {
    //     icon: 'fa fa-table',
    //     type: 'batch',
    //     label: '动态表格',
    //     list: [],
    //     options: {
    //         scrollY: 0,
    //         tableName: '',
    //         disabled: false,
    //         hidden: false,
    //         showLabel: false,
    //         hideSequence: false,
    //         width: '100%'
    //     }
    // },
    {
        icon: 'el-icon-warning',
        type: 'alert',
        label: '警告提示',
        options: {
            type: 'success',
            showIcon: false,
            banner: false,
            hidden: false,
            closable: false,
            defaultValue: ''
        }
    },
    {
        icon: 'fa fa-file-text',
        type: 'text',
        label: '文字',
        options: {
            width: '100%',
            lineHeight: '',
            textAlign: 'left',
            hidden: false,
            textSize: '14',
            textColor: 'rgba(0,0,0,.65)',
            textBold: false,
            textItalic: false,
            textUnderline: false,
            textStrikethrough: false,
            defaultValue: ''
        }
    },
    // {
    //     icon: 'fa fa-keyboard-o',
    //     type: 'button',
    //     label: '按钮',
    //     options: {
    //         type: 'primary',
    //         ghost: false,
    //         handle: 'submit',
    //         dynamicFun: '',
    //         icon: '',
    //         shape: null,
    //         size: 'default',
    //         block: false,
    //         hidden: false,
    //         disabled: false,
    //         defaultValue: ''
    //     }
    // },
    {
        type: 'html',
        label: 'HTML',
        icon: 'fa fa-code',
        options: {
            hidden: false,
            defaultValue: '<strong>HTML</strong>'
        }
    }
];
export const config = {
    layout: 'horizontal',
    labelCol: {
        xs: 4,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 4
    },
    wrapperCol: {
        xs: 18,
        sm: 18,
        md: 18,
        lg: 18,
        xl: 18,
        xxl: 18
    },
    hideRequiredMark: false,
    columns: 'one',
    print: false,
    labelAlign: 'right'
};