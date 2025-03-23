import styled from "styled-components";

const CardContainer = styled.div.attrs({
  className: "card-container",
})`
  border: 2px solid #393939;
  padding: 24px;
  border-radius: 6px;
  ${(props) => {
    return (
      props.$dark &&
      `
      background-color: black;
      color: white;
      border: none;
    `
    );
  }}
`;

export default function Card() {
  return (
    <CardContainer $dark>
      <h2>Styled Component</h2>
    </CardContainer>
  );
}
