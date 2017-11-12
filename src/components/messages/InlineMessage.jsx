import React from 'react';
import PropTypes from 'prop-types';

const InlineMessage = ({text}) => (
	<span style={{color: '#AE5856'}}>{text}</span>
);

InlineMessage.propTypes = {
	text: PropTypes.string.isRequired,
};

export default InlineMessage;
