/**
 * 格式化日期为本地化字符串
 * @param {string} dateString - ISO日期字符串
 * @param {string} locale - 语言代码
 * @returns {string} 格式化的日期字符串
 */
export const formatDate = (dateString, locale = 'en') => {
  const date = new Date(dateString);
  
  const localeMap = {
    'en': 'en-US',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
    'ja': 'ja-JP'
  };

  const mappedLocale = localeMap[locale] || 'en-US';

  try {
    return date.toLocaleDateString(mappedLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    // 如果本地化失败，回退到英语
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

/**
 * 获取相对时间字符串
 * @param {string} dateString - ISO日期字符串
 * @param {string} locale - 语言代码
 * @returns {string} 相对时间字符串
 */
export const getRelativeTime = (dateString, locale = 'en') => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return rtf.format(-interval, unit);
    }
  }

  return rtf.format(0, 'second');
};

/**
 * 检查日期是否为今天
 * @param {string} dateString - ISO日期字符串
 * @returns {boolean} 是否为今天
 */
export const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  
  return date.toDateString() === today.toDateString();
};

/**
 * 检查日期是否在指定天数内
 * @param {string} dateString - ISO日期字符串
 * @param {number} days - 天数
 * @returns {boolean} 是否在指定天数内
 */
export const isWithinDays = (dateString, days) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  return diffInDays <= days;
};
