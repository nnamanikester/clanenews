import PropTypes from 'prop-types';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  SafeAreaView,
  ViewProps,
  StatusBar,
} from 'react-native';
import {widthPercentageToDP as wd} from 'react-native-responsive-screen';
import {Clickable} from '../Clickable';
import {Icon} from '../Icon';

export interface LayoutProps extends ViewProps {
  /**
   * Index of the item to float on the top of the screen onScroll.
   */
  itemsToFloat?: number[];
  /**
   * If `true`, the element layout won't be Scrollable. Default id `false`.
   */
  noScroll?: boolean;
  /**
   * Invoked when a the user scrolls to the bottom of the scrollview
   */
  onEndReached?: () => void | undefined;
  /**
   * Invoked when the view start refreshing
   */
  onRefresh?: () => void | Promise<void> | undefined;
  /**
   * Whether the view should be indicating an active refresh
   */
  refreshing?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  itemsToFloat = [],
  style = {},
  noScroll = false,
  onEndReached = () => {},
  onRefresh = () => {},
  refreshing = false,
}) => {
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wd('4.5%'),
      backgroundColor: '#FFFDFD',
    },
    fab: {
      position: 'absolute',
      width: '100%',
      height: 40,
      elevation: 5,
      backgroundColor: `#2614c1`,
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 0,
    },
  });

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any): boolean => {
    const paddingToBottom = 0;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const shouldShowScrollToTop = ({contentOffset}: any): boolean => {
    if (contentOffset.y > 5970) {
      return true;
    }
    return false;
  };

  const scroll: any = React.useRef(null).current;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2614c1" />
      {noScroll ? (
        <SafeAreaView style={{flex: 1}}>
          <View style={[styles.container, style]}>{children}</View>
        </SafeAreaView>
      ) : (
        <>
          <SafeAreaView style={{flex: 1}}>
            <ScrollView
              ref={scroll}
              refreshControl={
                <RefreshControl
                  colors={['#2614c1']}
                  onRefresh={onRefresh}
                  refreshing={refreshing}
                  progressBackgroundColor="#fff"
                />
              }
              scrollEventThrottle={400}
              stickyHeaderIndices={[...itemsToFloat]}
              showsVerticalScrollIndicator={false}
              onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  onEndReached();
                }
                if (shouldShowScrollToTop(nativeEvent)) {
                  setShowScrollToTop(true);
                } else {
                  setShowScrollToTop(false);
                }
              }}
              bounces
              style={[styles.container, style]}>
              {children}
            </ScrollView>
            {showScrollToTop && (
              <Clickable
                onClick={() => scroll?.scrollTo({y: 0, animated: true})}
                style={styles.fab}>
                <Icon name="md-arrow-up" color="#fff" size={30} />
              </Clickable>
            )}
          </SafeAreaView>
        </>
      )}
    </>
  );
};
