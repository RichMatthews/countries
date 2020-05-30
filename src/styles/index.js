export const BRAND_COLOR = '#54e1e8'
export const KIERAN_GREY = '#323c46'

export const customReactSelectStyles = {
    control: (base, state) => ({
        ...base,
        background: '#fff',
        color: 'red',
        height: 46,
        fontSize: 15,
        marginBottom: 20,
        paddingLeft: state.selectProps.country ? 0 : 30,
        '&:hover': {
            color: '',
        },
    }),
    placeholder: (base) => ({
        ...base,
        color: '#9393A8',
    }),
    option: (base, state) => ({
        ...base,
        color: KIERAN_GREY,
        fontSize: 13,
        padding: 10,
    }),
    menu: (base) => ({
        ...base,
        zIndex: 999,
    }),
    menuList: (base) => ({
        ...base,
        color: KIERAN_GREY,
        padding: 0,
        zIndex: 20,
    }),
}
