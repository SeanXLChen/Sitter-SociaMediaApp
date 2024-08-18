'use client'

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '../Avatar';

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  // 点击用户头像或用户名跳转到用户个人主页
  const goToUser = useCallback((event: any) => {
    event.stopPropagation();
    router.push(`/users/${data.user.id}`);
  }, [router, data.user.id]);

  // 格式化创建时间
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      className="
        border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        {/* Avatar 组件 */}
        <Avatar userId={data.user.id} />
        
        <div>
          <div className="flex flex-row items-center gap-2">
            {/* 用户名 */}
            <p
              onClick={goToUser}
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
              "
            >
              {data.user.name}
            </p>

            {/* 用户名右边的用户名（灰色，响应式隐藏/显示） */}
            <span
              className="
                text-neutral-500 
                cursor-pointer 
                hover:underline 
                hidden 
                md:block
              "
            >
              @{data.user.username}
            </span>

            {/* 创建时间 */}
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
          </div>

          {/* 评论内容 */}
          <div className="text-white mt-1">
            {data.body}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
