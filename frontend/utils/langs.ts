export interface LanguageSection {
  welcome: {
    title: string
    desc: string
    button: string
    terms: string
  }
  login: {
    title: string
    input_email: string
    input_password: string
    button_login: string
    terms: string
    button_register: string
  }
  register: {
    title: string
    input_email: string
    input_password: string
    input_passwordComfirmed: string
    button_register: string
    terms: string
    button_login: string
  }
  chat: {
    titleChat: string
    text_started: string
    button_copy: string
    input: string
  }
  languge: {
    title: string
    langugeText: {
      vietnamese: string
      english: string
    }
  }
  term: {
    title: string
    desc: string
    terms: string
  }
  about: {
    title: string
    aboutUs: Array<{
      image: string
      name: string
      mssv: string
      email: string
    }>
  }
  buttonScreen: {
    chat: string
    history: string
    setting: string
  }
  history: {
    title: string
    desc: string
  }
  setting: {
    title: string
    buttonText: {
      about: string
      term: string
      languge: string
    }
  }
}

export interface Langs {
  vietnamese: LanguageSection
  english: LanguageSection
}

const langs: Langs = {
  vietnamese: {
    welcome: {
      title: 'Chào mừng đến với Ai chat bot',
      desc: 'Hãy cùng bắt đầu hành trình với trí tuệ nhân tạo, nơi mọi thắc mắc của bạn sẽ được giải đáp!',
      button: 'Bắt đầu',
      terms: 'Điều khoản & điều kiện'
    },
    login: {
      title: 'Chào mừng đến với Ai chat bot',
      input_email: 'Tài khoản',
      input_password: 'Mật khẩu',
      button_login: 'Đăng nhập',
      terms: 'Chưa có tài khoản?',
      button_register: 'Đăng ký'
    },
    register: {
      title: 'Chào mừng đến với Ai chat bot',
      input_email: 'Tài khoản',
      input_password: 'Mật khẩu',
      input_passwordComfirmed: 'Xác nhận mật khẩu',
      button_register: 'Đăng ký',
      terms: 'Đã có tài khoản?',
      button_login: 'Đăng nhập'
    },
    chat: {
      titleChat: 'Tiêu đề',
      text_started: 'Bắt đầu trò chuyện!',
      button_copy: 'Sao chép',
      input: 'Hỏi bất cứ điều gì...'
    },
    languge: {
      title: 'Ngôn ngữ',
      langugeText: {
        vietnamese: 'Tiếng Việt',
        english: 'Tiếng Anh'
      }
    },
    term: {
      title: 'Điều khoản & điều kiện',
      desc: 'Điều khoản & điều kiện của ứng dụng chúng tôi',
      terms:
        'Không phải ai cũng biết cách tạo một thỏa thuận Chính sách Bảo mật, đặc biệt là với các quy định của CCPA, GDPR, CalOPPA, PIPEDA hoặc Luật Quyền riêng tư của Úc. Nếu bạn không phải là luật sư hoặc người quen thuộc với Chính sách Bảo mật, bạn sẽ bị mù mờ. Một số người thậm chí có thể lợi dụng bạn vì điều này. Một số người có thể thậm chí đe dọa bạn để lấy tiền. Đây là một số ví dụ mà chúng tôi muốn ngăn chặn không xảy ra với bạn. Chúng tôi sẽ giúp bạn bảo vệ bản thân bằng cách tạo Chính sách Bảo mật. Công cụ tạo Chính sách Bảo mật của chúng tôi có thể giúp bạn đảm bảo rằng doanh nghiệp của bạn tuân thủ luật pháp. Chúng tôi ở đây để giúp bạn bảo vệ doanh nghiệp của mình, bản thân và khách hàng của bạn. Điền vào các khoảng trống dưới đây và chúng tôi sẽ tạo ra một Chính sách Bảo mật trang web được cá nhân hóa cho doanh nghiệp của bạn. Không yêu cầu đăng ký tài khoản. Chỉ cần tạo & tải xuống Chính sách Bảo mật trong vài giây!'
    },
    about: {
      title: 'Nhóm 1',
      aboutUs: [
        {
          image: '../../assets/Tuan.jpg',
          name: 'Lê Văn Tuấn',
          mssv: '121001332',
          email: 'vantuancutevaytaz@gmail.com'
        },
        {
          image: '../../assets/Loc.jpg',
          name: 'Trần Hữu Lộc',
          mssv: '121001198',
          email: 'tranhuuloc4423@gmail.com'
        },
        {
          image: '../../assets/Quan.jpg',
          name: 'Nguyễn Minh Quân',
          mssv: '121001113',
          email: 'minkuan1704@gmail.com'
        },
        {
          image: '../../assets/Nhan.jpg',
          name: 'Nguyễn Thiện Nhân',
          mssv: '121001126',
          email: 'nguyenthiennhan08052003@gmail.com'
        }
      ]
    },
    buttonScreen: {
      chat: 'Trò chuyện',
      history: 'Lịch sử',
      setting: 'Cài đặt'
    },
    history: {
      title: 'Lịch sử',
      desc: 'Các chủ đề'
    },
    setting: {
      title: 'Cài đặt',
      buttonText: {
        about: 'Về chúng tôi',
        term: 'Điều khoản',
        languge: 'Ngôn ngữ'
      }
    }
  },
  english: {
    welcome: {
      title: 'Welcome to Ai chat bot',
      desc: 'Begin your journey with artificial intelligence, where all your questions will be answered!',
      button: 'Get started',
      terms: 'Terms & conditions'
    },
    login: {
      title: 'Welcome to Ai chat bot',
      input_email: 'Email',
      input_password: 'Password',
      button_login: 'Login',
      terms: "Don't have an account?",
      button_register: 'register'
    },
    register: {
      title: 'Welcome to Ai chat bot',
      input_email: 'Email',
      input_password: 'Password',
      input_passwordComfirmed: 'Password Comfirmed',
      button_register: 'register',
      terms: 'Already have an account?',
      button_login: 'Login'
    },
    chat: {
      titleChat: 'Untitled',
      text_started: 'start conversation!',
      button_copy: 'Copy text',
      input: 'Ask anything ...'
    },
    languge: {
      title: 'Languge',
      langugeText: {
        vietnamese: 'Vietnamese',
        english: 'English'
      }
    },
    term: {
      title: 'Term & conditions',
      desc: 'Our app term & conditions',
      terms:
        "Not everyone knows how to make a Privacy Policy agreement, especially with CCPA or GDPR or CalOPPA or PIPEDA or Australia's Privacy Act provisions. If you are not a lawyer or someone who is familiar to Privacy Policies, you will be clueless. Some people might even take advantage of you because of this. Some people may even extort money from you. These are some examples that we want to stop from happening to you. We will help you protect yourself by generating a Privacy Policy. Our Privacy Policy Generator can help you make sure that your business complies with the law. We are here to help you protect your business, yourself, and your customers. Fill in the blank spaces below and we will create a personalized website Privacy Policy for your business. No account registration required. Simply generate & download a Privacy Policy in seconds!"
    },
    about: {
      title: 'About Us',
      aboutUs: [
        {
          image: '../../assets/Tuan.jpg',
          name: 'Lê Văn Tuấn',
          mssv: '121001332',
          email: 'vantuancutevaytaz@gmail.com'
        },
        {
          image: '../../assets/Loc.jpg',
          name: 'Trần Hữu Lộc',
          mssv: '121001198',
          email: 'tranhuuloc4423@gmail.com'
        },
        {
          image: '../../assets/Quan.jpg',
          name: 'Nguyễn Minh Quân',
          mssv: '121001113',
          email: 'minkuan1704@gmail.com'
        },
        {
          image: '../../assets/Nhan.jpg',
          name: 'Nguyễn Thiện Nhân',
          mssv: '121001126',
          email: 'nguyenthiennhan08052003@gmail.com'
        }
      ]
    },
    buttonScreen: {
      chat: 'Chat',
      history: 'History',
      setting: 'Settings'
    },
    history: {
      title: 'History',
      desc: 'Topics'
    },
    setting: {
      title: 'Settings',
      buttonText: {
        about: 'About us',
        term: 'Term of conditions',
        languge: 'Languge'
      }
    }
  }
}

export default langs
