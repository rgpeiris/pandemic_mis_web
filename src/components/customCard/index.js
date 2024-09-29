import React from "react";
import PropTypes from "prop-types";

const CustomCard = React.forwardRef((props, ref) => {
  const { children, style, onClick } = props;
  return (
    <div
      ref={ref}
      style={{
        borderRadius: "12px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 0px 8px #0000001D",
        padding: "20px 20px 20px 20px",
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
});

CustomCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClick: PropTypes.func,
};

export default CustomCard;
