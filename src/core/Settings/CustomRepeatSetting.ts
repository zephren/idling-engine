export const CustomRepeatSetting = ({ component, items }: any) => {
  return items.map((item: any, index: number) => {
    return component(item, index);
  });
};
