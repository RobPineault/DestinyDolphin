
const ItemTooltip = React.forwardRef(function MyComponent(props, ref) {
    //  Spread the props to the underlying DOM element.
    return <div {...props} ref={ref}>
        {props.name }
    </div>
});

export default ItemTooltip;