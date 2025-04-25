import React from "react";

export default function Footer() {
    return (
      <footer className="px-4 text-black flex border-t-1 w-full" style={{borderColor: 'rgba(0, 0, 0, 0.12)'}}>
        <div className="container m-auto">
            <div className='justify-center py-2 flex items-center w-full'>
              <div className='py-2 space-x-2'>Powered by <a target={'_blank'} href="https://t.me/yazhezhuk" style={{color:'#999999'}}>@yazhehuk</a>& <a target={'_blank'} href="https://www.linkedin.com/in/korytsky/" style={{color:'#999999'}}>@korytsky</a></div>
            </div>
        </div>
      </footer>
    );
}
