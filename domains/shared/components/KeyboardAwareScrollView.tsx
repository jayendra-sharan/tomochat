import React, {
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
  forwardRef,
} from "react";
import {
  ScrollView,
  Keyboard,
  NativeSyntheticEvent,
  NativeScrollEvent,
  KeyboardEvent,
  InteractionManager,
} from "react-native";

type Props = React.ComponentProps<typeof ScrollView>;

export const KeyboardAwareScrollView = forwardRef<ScrollView, Props>(
  ({ children, ...props }, ref) => {
    const scrollRef = useRef<ScrollView>(null);
    const [scrollY, setScrollY] = useState(0);

    useImperativeHandle(ref, () => scrollRef.current!);

    useEffect(() => {
      const onShow = (e: KeyboardEvent) => {
        const kbHeight = e.endCoordinates.height;

        InteractionManager.runAfterInteractions(() => {
          scrollRef.current?.scrollTo({
            y: scrollY + kbHeight,
            animated: true,
          });
        });
      };

      const onHide = () => {};

      const showSub = Keyboard.addListener("keyboardDidShow", onShow);
      const hideSub = Keyboard.addListener("keyboardDidHide", onHide);

      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, [scrollY]);

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setScrollY(e.nativeEvent.contentOffset.y);
      props.onScroll?.(e);
    };

    return (
      <ScrollView
        ref={scrollRef}
        {...props}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {children}
      </ScrollView>
    );
  },
);
