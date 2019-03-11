import styled from 'styled-components';

const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000'
    }
  }
})``

const Container = styled.View`
  flex: 2;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #000000;
`;

const Logo = styled.Image`
  height: ${props => props.logoHeight};
  marginTop: ${props => props.logoMgTop ? "100px" : "0"};
  marginBottom: ${props => props.logoMgBtm};
`;

const Input = styled.TextInput`
  paddingHorizontal: 20px;
  paddingVertical: 15px;
  borderRadius: 25px;
  backgroundColor: #000000;
  border: 1px solid #595959;
  alignSelf: stretch;
  marginBottom: 15px;
  marginHorizontal: 20px;
  fontSize: 16px;
  color: #FFF;
`;

const SuccessMessage = styled.Text`
  textAlign: center;
  color: #08a092;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const Text = styled.Text`
  textAlign: center;
  color: #FFF;
  fontSize: 16px;
`;

const ErrorMessage = styled.Text`
  textAlign: center;
  color: #ce2029;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const Button = styled.TouchableHighlight`
  paddingHorizontal: 20px;
  paddingVertical: 15px;
  borderRadius: 25px;
  backgroundColor: #000000;
  border: 1px solid #595959;
  alignSelf: stretch;
  marginTop: 10px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const ButtonText = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

const SignUpLink = styled.TouchableHighlight`
  
  marginTop: 20px;
`;

const SignUpLinkText = styled.Text`
  color: #999;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
  paddingBottom: 80px;
`;

export { Text, ScrollContainer, Container, Logo, Input, SuccessMessage, ErrorMessage, Button, ButtonText, SignUpLink, SignUpLinkText };