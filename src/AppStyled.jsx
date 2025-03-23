import Card from "./components/StyledComponents/Card";
import BaseButton from "./components/StyledComponents/BaseButton";
import StyledButton from "./components/StyledComponents/StyledButton";

export default function AppStyled() {
  return (
    <div>
      <Card />
      <hr />
      <BaseButton>BaseButton</BaseButton>
      <StyledButton>StyledButton</StyledButton>
    </div>
  );
}
