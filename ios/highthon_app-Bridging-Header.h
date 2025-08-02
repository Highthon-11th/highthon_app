// YourAppName-Bridging-Header.h
#ifndef YourAppName_Bridging_Header_h
#define YourAppName_Bridging_Header_h

// 기본 프레임워크들을 먼저 import
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

// React Native 헤더들
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

// 마지막에 RNKakaoLogins import
#import "RNKakaoLogins.h"

#endif /* YourAppName_Bridging_Header_h */
